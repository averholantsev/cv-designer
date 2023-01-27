# Демо-приложение для формирования CV

Интерфейс для формирования CV. Интеграция с Firebase. Загрузка картинок на Firebase. Routing, React-Hook-Form, Rematch, MUI.  

[Демостенд](https://averholantsev.github.io/cv-designer)

## Требования к среде

+ **NodeJS**: 16
+ **NPM**: 8

## Команды для CI/CD

Установка и сборка проекта:

```shell
npm install
npm run build
```

Результат создается в сгенерированной в корне папке `build`

## Для разработки

Для запуска в localhost:

```shell
npm start
```

## Скрипты

Проверка на покрытие тестами:

```shell
npm run test:coverage
```

Автоматическое исправление ошибок линтера

```shell
npm run lint:fix
```

Публикация приложение на Github pages

```shell
npm run build
npm run deploy
```
