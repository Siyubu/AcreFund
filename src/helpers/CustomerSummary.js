import { CustomerSummaries as cs, Repayments as payment } from '../database/models/index';


export const customerSummary = async (customerID) => {
    const seasons = await cs.findAll({ where: { customerID } })
    if (seasons) {
        const customerWithDebt = seasons.map((season) => {
            let debt = season.totalCredit - season.totalRepaid
            if (debt > 0) season.dataValues.message = `Client owes ${debt} for this season`
            else if (debt == 0) season.dataValues.message = `Client is fully repaid for this season`
            else if (debt < 0) season.dataValues.message = `Client is overpaid by ${-(debt)} for this season`
            season.dataValues.debt = debt
            season.dataValues.amount = 0
            return season
        });

        return customerWithDebt
    }

    return { message: `No seasons for customer of id ${customerID}` }
};





export const seasonRepayment = async (customerID, seasons, amount, date, seasonID) => {
    const seasonId = seasonID == undefined ? seasons[0].seasonID : seasonID
    let len = seasons.length
    await payment.create({ customerID, seasonID: seasonId, date, amount, parentID: 0 })
    seasons.forEach(async (season, index) => {
        const parentID = index - 1 > 0 ? seasons[index - 1].seasonID : 0
        if (seasonID == undefined) {
            if (parseFloat(season.dataValues.debt) > 0 && parseFloat(amount) > parseFloat(season.dataValues.debt)) {
                season.totalRepaid = parseFloat(season.totalRepaid) + parseFloat(season.dataValues.debt)
                amount = parseFloat(amount) - parseFloat(season.dataValues.debt)
            }
            else if (parseFloat(season.dataValues.debt) > 0 && parseFloat(amount) < parseFloat(season.dataValues.debt)) {
                season.totalRepaid = parseFloat(season.totalRepaid) + parseFloat(amount)
            }
            else if (season.dataValues.debt == 0) {
                seasons[len - 1].totalRepaid = parseFloat(seasons[len - 1].totalRepaid) + parseFloat(amount)
            }

            season.dataValues.amount =parseFloat(amount)
            season.dataValues.debt = parseFloat(season.totalCredit) - parseFloat(season.totalRepaid)
            await payment.create({ customerID, seasonID: season.seasonID, date, amount: season.dataValues.amount, parentID })
        }
        else {
            if (season.seasonID == seasonID) {
                season.totalRepaid = parseFloat(season.totalRepaid) + parseFloat(amount)
            }
        }
        await cs.update(
            {
                totalRepaid: parseFloat(season.totalRepaid),
                totalCredit: parseFloat(season.totalCredit)
            },
            { where: { customerID, seasonID: season.seasonID } }
        )
    });
}

// export const recordsReport = async (customerID) => {
//     const reports = []
//     const records = await payment.findAll({
//         where: { customerID }
//     });
//     if (records) {
//         for (let i = 0; i < records.length; i++) {
//             reports.push(`Repaymend record #${i + 1}, with Season = ${records[i].seasonID}, and Amount = ${records[i].amount}`)
//         }
//     }
//     return reports.reverse()
// }


