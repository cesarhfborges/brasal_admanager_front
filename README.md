<p align="center"><a href="https://brasal.com.br" target="_blank"><img src="https://www.brasal.com.br/inovacao/wp-content/uploads/2019/06/logo_brasal.png" width="400"></a></p>


## Instalar

Instale as dependiencias
```
npm install
```

## Rodar o projeto
Para rodar o projeto use o comando abaixo, padrao laravel
```
npm start
```


## Pacotes usados (Documentação)
- [Nebular Template](https://akveo.github.io/nebular/docs/getting-started/what-is-nebular#what-is-nebular).
- [Angular](https://angular.io/docs).
- [ng-select](https://github.com/ng-select/ng-select).
- [Prime-NG](https://primefaces.org/primeng/showcase/#/).

## Problemas
Problemas no carregamento dos pacotes
```
composer dump-autoload
```

Problemas de cache
```
php artisan cache:clear
```

## Build 

Producao
```
npm run build:prod
```

Homologação
```
npm run build:homologacao
```

Manual
Alterar o base-href para o path final onde a aplicação vai rodar.
```
npm run build -- --prod --aot --base-href /admin/
```
