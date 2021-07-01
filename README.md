# nexus-iq-waivers-dashboard

At the moment Nexus IQ Server allows violating components to be waived against policies. What this means is that when these components are being evaluated as a part of the application, there won’t be any policy violation against the policies that these components are waived for.   

When waiving components at scale for hundreds or thousands applications loaded into the IQ Server it might be a little hard to have a single snapshot view of all the components that have been waived against each policy. This utility application / dashboard allows teams to be able to review all the waived application components against any IQ policies.

## Installation

The utility requires a nodejs as a dependency if the intention is to directly interface the dashboard to the IQ Server as the dashboard talks to a nodejs reverse proxy to receive necessary header settings such as Access-Control-Allow-Origin. However, if the IQ Server is installed behind the proxy already, you’ll have to be sure the proxy returns Access-Control-Allow-Origin header otherwise, your browser blocks the response due to the CORS restrictions.

## Nodejs Reverse Proxy

If you choose to use the dashboard’s default nodejs reverse proxy, below is the instructions to build and run it.

### Building the reverse proxy
Please run the following command to build the project and have necessary dependencies available:

```
xxx:xxx$ npm install
npm WARN saveError ENOENT: no such file or directory, open '/xxx/xxx/xxx/xxx/xxx/package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open '/xxx/xxx/xxx/xxx/xxx/package.json'
npm WARN xxx No description
npm WARN xxx No repository field.
npm WARN xxx No README data
npm WARN xxx No license field.

up to date in 0.37s
found 0 vulnerabilities
```

### Nodejs reverse proxy components

The project comes with a single js file called app.js which is the actual reverse proxy implementation and a configuration file to be able to configure the IQ Server url as well as the user token for IQ authentication.

### Generate IQ Server user token

It is recommended to create a local IQ user and generate a usercode and passcode for this user. Please refer to the [IQ Server user token management](https://help.sonatype.com/iqserver/managing/user-management/user-tokens) for more information on how to generate a user token.

### Running the proxy server

Please use the below command to run the proxy server:

```
xxx:reverse-proxy xxx$ node app.js
```

## Waivers Dashboard

The dashboard is a single html and javascript page which can be deployed into a web server or open as a standalone html file.

**Note:** If you chose to use the dashboard using the default reverse proxy, all you need to do is configure the url of the reverse proxy within the html file.

![Screen Shot 2021-07-01 at 1 33 52 pm](https://user-images.githubusercontent.com/3271380/124068805-86f6fc80-da7e-11eb-9e23-6ac58fd5eda5.png)

![Screen Shot 2021-07-01 at 1 44 56 pm](https://user-images.githubusercontent.com/3271380/124068814-8a8a8380-da7e-11eb-8440-5826a6ee308e.png)

![Screen Shot 2021-07-01 at 1 49 35 pm](https://user-images.githubusercontent.com/3271380/124068820-8cecdd80-da7e-11eb-9e00-53bdee8df743.png)


However if you choose to use your own reverse proxy, you’d have to configure the url in addition to the IQ Server username and password as shown in the above screenshot. You may choose to generate a user token instead of plain username and password.

In addition to the above you should also uncomment two lines of code within the html file to include authentication as http request headers as well.


## Opening the Dashboard

If you have configured all the above steps you should now be able to open the html file and see all the application waivers for the IQ Server that you’ve configured the url for.

![Screen Shot 2021-07-01 at 1 56 56 pm](https://user-images.githubusercontent.com/3271380/124068617-2bc50a00-da7e-11eb-97e9-87905a7aec1f.png)

![Screen Shot 2021-07-01 at 1 55 59 pm](https://user-images.githubusercontent.com/3271380/124068765-734b9600-da7e-11eb-9690-4d6a524e7e02.png)

**I'd appreciate your feedbacks, so please raised them under the issue section**
