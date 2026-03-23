import { Router } from "express";

const adminRouter = Router();

adminRouter.get('/', (req, res) => {
    res.send({ title: 'Admin root endpoint' });
});

// Get overall site statistics
adminRouter.get('/stats', (req, res) => {res.send({ title: 'GET overall site statistics' });});
// Get user analytics
adminRouter.get('/analytics/users', (req, res) => {res.send({ title: 'GET user analytics' });});
// Get post analytics
adminRouter.get('/analytics/posts', (req, res) => {res.send({ title: 'GET post analytics' });});
// Get comment analytics
adminRouter.get('/analytics/comments', (req, res) => {res.send({ title: 'GET comment analytics' });});

export default adminRouter;
