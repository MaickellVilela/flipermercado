# Flipermercado

[A really exciting description here]

## DEV environment

### Install dependencies

#### Project dependencies
  - Node >= `12.0.0`

#### Libs dependencies

```sh
yarn install
```

#### Config environment

Create config file

```sh
cp config.sample.js config.js
```

Open `./config.js` file and change the `googleScriptURL` value to a valid Google Script API link.


[Sample script]

### Expo

#### Install Expo Client

```sh
npm install -g expo-cli
```

#### Login with an existent [account](https://expo.io/)

```
expo login
```

### Start server

```sh
yarn start
```

## Contribution

### Sync with upstream

#### Create `upstream` and set remore

```sh
git remote add upstream git@github.com:izn/flipermercado.git
```

#### Update `upstream`

```sh
git fetch upstream
```

#### Checkout to Master

```sh
git checkout master
```

#### Merge your local master with updated `upstream` master

```sh
git merge upstream/master
```

.
.
.
.
.
.
And `sorry` about that.
