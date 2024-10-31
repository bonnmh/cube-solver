const express = require('express');
const rubikSolver = require('./src/cube-solver');

const app = express();
const PORT = 5011;

// get all todos
app.get('/rubik/solve', (req, res) => {
    // console.log(req.param);
    const config = req.param('config');
    try {
        if (!config) {
            throw new Error("No cube config received.");
        }

        const solvedCubik = rubikSolver.solveRubikWithConfig(config);
        res.status(200).send({
            success: 'true',
            manouver: solvedCubik
        })

    } catch (error) {
        res.status(500).send({
            status: 500,
            message: error.message,
            error: error
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});