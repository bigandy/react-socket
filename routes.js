import AppComponent from './public/js/components/app';
import FormComponent from './public/js/components/form';

const routes = {
	path: '',
	component: AppComponent,
	childRoutes: [
		{
			path: '/',
			component: FormComponent,
		},
	],
};

export { routes };
