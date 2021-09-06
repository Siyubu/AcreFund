
import { Customers as customer, Seasons as season, CustomerSummaries as cs, Repayments as payment } from '../database/models/index';
import { customerSummary, seasonRepayment} from '../helpers/customerSummary'

export default class SeasonlessRepaymentService {
    static async registerCustomer(req, res) {
        const { name } = req.body;
        const new_customer = await customer.create({ name })
        res.status(200).json({
            message: `${new_customer.name} Registered succesfully`
        })
    }

    static async registerSeason(req, res) {
        const { name, startDate, endDate } = req.body;
        const new_season = await season.create({ name, startDate, endDate })
        res.status(200).json({
            message: `${new_season.name} Created succesfully`
        })
    }

    static async createCustomerSummary(req, res) {

        const { customerID, seasonID, totalRepaid, totalCredit } = req.body;
        const foundCustomer = await customer.findOne({ where: { id: customerID } });
        const foundSeason = await season.findOne({ where: { id: seasonID } })
        if (!foundCustomer) {
            return res.status(400).json({ error: 'No such User in the database' });
        }
        if (!foundSeason) {
            return res.status(400).json({ error: 'No such Season in the database' });
        }
        await cs.create({ customerID, seasonID, totalRepaid, totalCredit })
        res.status(200).json({
            message: `${foundCustomer.name} 's summary is created succesfully`
        })
    }


    static async getCustomerSummary(req, res) {
        const { customerID } = req.params
        const customerWithDebt = await customerSummary(customerID)
        return res.status(200).json({
            customerWithDebt
        })
    }

    static async clientRepayments(req, res) {
        const { customerID, seasonID, date,amount  } = req.query
        
        let customerSeasonsWithDebt = await customerSummary(customerID)

        if (Array.isArray(customerSeasonsWithDebt)) {
        await seasonRepayment(customerID, customerSeasonsWithDebt, amount, date, seasonID,)
        }
        customerSeasonsWithDebt = await customerSummary(customerID)

        res.status(200).json({
            customerSeasonsWithDebt,
        })

    }


    static async recordsReport (req,res)  {
        const { customerID } = req.params
        const reports = []
        const records = await payment.findAll({
            where: { customerID }
        });
        if (records) {
            for (let i = 0; i < records.length; i++) {
                reports.push(`Repaymend record #${i + 1}, with Season = ${records[i].seasonID}, and Amount = ${records[i].amount}`)
            }
        }
        return res.status(200).json({report:reports.reverse()})
         
    }

  
}