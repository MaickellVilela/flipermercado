# Flipermercado

[A really exciting description here]

## DEV envoriment

### Install depedences

#### Projet depedences
  - Node >= `12.0.0`

#### Libs depedences

```sh
yarn isntall
```

#### Config envoriment

Create config file

```sh
cp config.sample.js config.js
```

And inside on `./config.js` change the `googleScriptURL` value to a valid google sheets script link.


[Sample script]

### Expo

#### Install Expo Client

```sh
npm isntall -g expo-cli
```

#### Loign with a existent [account](https://expo.io/)

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

#### Checkout to master

```sh
git checkout master
```

#### Merge your local master with updated `upstream`

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
