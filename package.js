Package.describe({
  summary: "Greenlight data site template"
});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    api.use('deps', ['client', 'server']);
    api.use('session', ['client', 'server']);
    api.use('greenlight', ['client','server']);
    
    api.add_files(['client/endpoints.html', 'client/endpoints.js', 'client/endpoints.css'], 'client');
    api.add_files(['client/transforms.html', 'client/transforms.js', 'client/transforms.css'], 'client');
    api.add_files(['client/datasets.html', 'client/datasets.js', 'client/datasets.css'], 'client');
    api.add_files(['client/streams.html', 'client/streams.js', 'client/streams.css'], 'client');
    
    api.add_files(['client/data_page.html', 'client/data_page.js', 'client/data_page.css'], 'client');

    api.add_files('client/data.js', 'client');
    api.add_files('server/data.js', 'server');
});

Package.on_test(function (api) {
    api.add_files('data_tests.js', 'client');
});
