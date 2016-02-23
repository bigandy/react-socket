module.exports = {
	parser: 'babel-eslint',
	extends: 'airbnb',
	rules: {
		indent: [
			2,
			'tab',
		],
		quotes: [
			2,
			'single',
		],
		'linebreak-style': [
			2,
			'unix',
		],
		semi: [
			2,
			'always',
		],
		'no-console': [
			0,
		],
		'max-len': [
			1,
			80,
			4,
			{
				ignoreComments: true,
			},
		],
	},
	env: {
		browser: true,
		es6: true,
		node: false,
	},
};
