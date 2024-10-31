const Cube = require('cubejs');
require('cubejs/lib/solve.js');

Cube.initSolver();

// const cube = Cube.fromString("RLFFURLBULURURBRRRULBRFFFFFDDDDDDDDDULFRLFLLLUUBUBBBBB");
//"RLFFURLBU-LURURBRRR-ULBRFFFFF-DDDDDDDDD-ULFRLFLLL-UUBUBBBBB"
// "RLFFURLBULURURBRRRULBRFFFFFDDDDDDDDDULFRLFLLLUUBUBBBBB"

// console.log(cube.());
// console.log(cube.solve());


module.exports.solveRubikWithConfig = config => {
    const cube = Cube.fromString(config);
    return cube.solve();
}
