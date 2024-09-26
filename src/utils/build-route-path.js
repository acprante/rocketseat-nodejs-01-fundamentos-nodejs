//path: '/users/:id',
// 

export function buildRoutePath(path){
    const routeParameterRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(
        routeParameterRegex,
        '(?<$1>[a-z0-9-]+)'
    );

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

    return pathRegex;

    //console.log(path.match(routeParameterRegex));
    //console.log(Array.from(path.matchAll(routeParameterRegex)));
}