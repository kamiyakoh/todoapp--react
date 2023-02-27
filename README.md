# todoapp--react

**"todoapp--react"** は create-react-app で作成しました  
黒板デザインの ToDo アプリです  
作成黒板のすることの入力欄には 1 つ以上必ず入力してください

## 機能

- 作成黒板のタイトル入力中に変換選択していない時にエンターを押すとすることの入力欄にフォーカスが移動します
- 作成黒板のすることの入力中に変換選択していない時にエンターを押すと入力欄を追加できます
- 作成黒板のすることの入力中に空欄時にバックスペースを押すと入力欄が減ります
- 各進行中黒板のすることのチェックボックスを全てチェックすると完了ボタンが出現し押せるようになります
- 削除したい各完了済黒板の内側にあるチェックボックスを押してからまとめて削除ボタンを押すとまとめて削除できます

## 作成環境

- yarn 1.22.5
- react 18.2.0
- react-hook-form 7.43.1
- react-router-dom 6.8.1
- react-hot-toast 2.4.0
- emotion/react 11.10.5
- prettier 2.8.3
- eslint 8.33.0

## 使い方

1. `$ npm start` とターミナルにて入力で起動します
2. ブラウザにて "http://localhost:3000/" を開くと表示されます
3. ターミナルにて **"Crtl + c"** または **"cmd + c"** で停止します

## eslint

`$ npm init @eslint/config` を用いて以下の設定内容で設定しました

> How would you like to use ESLint? · style  
> What type of modules does your project use? · esm  
> Which framework does your project use? · react  
> Does your project use TypeScript? · No  
> Where does your code run? · browser  
> How would you like to define a style for your project? · guide  
> Which style guide do you want to follow? · airbnb  
> What format do you want your config file to be in? · JSON
>
> Would you like to install them now? · Yes  
> Which package manager do you want to use? · yarn

### extends

- "prettier" を追加し prettier との競合を抑制しました

### plugins

- "@emotion" を追加し CSS in JS の emotion を導入に対応しました

### rules

- "@emotion/pkg-renaming": "error" を追加し emotion 11 codemods に対応しました
- "react/no-unknown-property": ["error", { "ignore": ["css"] }] を追加し emotion 特有の css という prop に対して no-unknown-property ルールがより厳密すぎる判定され eslint がエラーを出す問題に対応しました
- "react/prop-types": "off" を追加し過剰な prop に対するエラーに対応しました
- "no-console": "off" を追加し console.log など console に対する警告を抑制しました
- "react/jsx-props-no-spreading": "off" を追加し react-hook-form の register に渡す prop に対する過剰なエラーを抑制しました
- "react/jsx-uses-react": "off", "react/react-in-jsx-scope": "off" を追加し React 17 から不要になった import React from 'react'; の記述になった事に対する過剰なエラーを抑制しました

## prettier

エディタが VSCode の場合、拡張機能に **_"Prettier - Code formatter"_** をインストールし有効化すると保存時に自動整形を行います  
prettier の設定は以下の設定です

- "tabWidth": 2, //インデントのスペースの数 2
- "singleQuote": true, //ダブルクォートの代わりにシングルクォートを使用するを有効に
- jsxSingleQuote //SX でダブルクォートの代わりにシングルクォートを使用するを有効に
- "semi": true //文末にセミコロンを追加する
