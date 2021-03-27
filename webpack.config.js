const path = require('path')

module.exports = {
  "mode": "development",
  "entry": "./js/main.js",
  "output": {
    "path": path.resolve(__dirname, 'dist')
  },
  "module": {
    "rules": [
      {
        "test": /\\.(js|jsx)$/,
        "include": [
          path.resolve(__dirname, 'js')
        ],
        "loader": 'babel-loader'
      }
    ]
  }
}
