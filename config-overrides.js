const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = {
  stats: {
    warningFilter: false,
    warnings: false
  },
  plugins: [],
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true // change importing css to less
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        "@primary-color": "#d93347",
        "link-color": "#d93347",
      }
    })
  )
};
