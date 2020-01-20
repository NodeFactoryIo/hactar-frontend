module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    extends: [
        "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
        "plugin:@typescript-eslint/recommended" // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        "@typescript-eslint/class-name-casing": "error",
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/interface-name-prefix": ["error", { "prefixWithI": "always" }],
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/explicit-function-return-type": "warn",
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/type-annotation-spacing": "error",
        "@typescript-eslint/member-ordering": "error",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/no-unused-vars": ["error", {
            "varsIgnorePattern": "^_"
        }],
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/semi": "error",
        "camelcase": "error",
        "no-param-reassign": "error",
        "max-len": ["error", {
            "code": 120
        }],
        "new-parens": "error",
        "no-caller": "error",
        "no-bitwise": "off",
        "no-multiple-empty-lines": "error",
        "no-console": "warn",
        "no-var": "error",
        "object-curly-spacing": ["error", "never"],
        "prefer-const": "error",
        "quotes": ["error", "double"],
        "semi": "off",
        "react/prop-types": "off"
    },
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
};
