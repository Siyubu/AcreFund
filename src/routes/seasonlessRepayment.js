import express from 'express';
import seasonlessRepayment from '../controller/seasonlessRepayment';

const router = express.Router();


router.post("/customer/register", seasonlessRepayment.registerCustomer);
router.post("/season/register", seasonlessRepayment.registerSeason);
router.post("/customer/summary",seasonlessRepayment.createCustomerSummary);
router.get("/summary/:customerID",seasonlessRepayment.getCustomerSummary);
router.get("/customer/transactions",seasonlessRepayment.clientRepayments);
router.get("/payments@records/:customerID", seasonlessRepayment.recordsReport)


export default router;