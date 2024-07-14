# Descriptions
Contains common CLI commands to build, test and upload AWS Lambda. <br />
Uses AWS CloudFormation template.

## CLI commands
Docker commands can be executed without root privileges.<br/>
- **Docker must be running in the background<br/>
- ```
  sudo ln -sf "$HOME/.docker/run/docker.sock" /var/run/docker.sock
  ```

Compile (@ lambda func level) <br/>
```
tsc
```

Build (@ project root) <br/>
```
sam build
```

Invoke Lambda locally with event (@ project root) <br/>
```
sam local invoke SendEmailFunction --event lambdas/sendEmailFunc/event.json
```

Invoke Lambda locally with no event (@ project root) <br/>
```
sam local invoke SendEmailFunction
```

Zip <br/>
```
zip -r {path_to_lambda_dist}/{lambda_func}.zip \*
```

Zip and upload (@ lambdas/{func_name}/dist) <br/>
```
zip -r -D lambda.zip \* && aws lambda update-function-code --function-name {lambda_func} --zip-file fileb://lambda.zip --profile {profile}
```

## Technologies & Tools
<p>
  <a
    href="https://www.typescriptlang.org/"
    target="_blank"
    rel="noreferrer"
    style="text-decoration:none"
  >
    <img
      src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
      alt="typescript"
      width="40"
      height="40"
    /></a>
  <a href="https://aws.amazon.com/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg"
      alt="aws"
      width="40"
      height="40"
    /></a>
  <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
    <img
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg"
      alt="docker"
      width="40"
      height="40"
    /></a>

</p>
