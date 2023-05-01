# teste-backend-nodejs-pleno

Este es un proyecto en Node como respuesta a una prueba.


## The content

- Mysql image
- API in Node
- Script Sql
- Swagger 
- Test 

## How to use

### Local Development

```markdown
git clone https://github.com/ezequielbugnon/rogalabs-test.git
```

In the main source

```markdown
npm install
```

and 

```markdown
npm run dev
```

## Docker MySql

If you want, you can run docker-compose.yml and the script slq 

```markdown
 docker compose up
```

### Route Production 

https://rogalabs-test-production.up.railway.app/api_test_rogalabs/v1/


### examples

All routes need token, get it in this route

```markdown
curl --request GET \
  --url 'https://rogalabs-test-production.up.railway.app/api_test_rogalabs/v1/token/dardo?='
```


```markdown
curl --request POST \
  --url https://rogalabs-test-production.up.railway.app/api_test_rogalabs/v1/pessoa \
  --header 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGFyZG8iLCJpYXQiOjE2ODI5MjA1MjMsImV4cCI6MTY4MjkzMTMyM30.ZY1tC-QOxk8pa3QynhJATSHtEWcS2L6xovvC4TOcy0k' \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "John Doe",
	"momName": "Marisa",
	"cep": "59178000",
	"dateOfBirth": "1992-12-12"
}'
```

### Swagger

[Documentation](
https://rogalabs-test-production.up.railway.app/api_test_rogalabs/v1/api-docs/#/token/get_token__name_
)