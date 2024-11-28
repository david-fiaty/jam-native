module.exports = {
  plugins: [
    ['babel-plugin-i18next-extract', {
      "locales": ["en", "fr"], 
      "keyAsDefaultValue": ["en"],
      "outputPath": "src/translation/{{locale}}/{{ns}}.json", 
    }]
  ]
}
