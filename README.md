Navigate me from [sumit-sampang-rai.github.io](https://sumit-sampang-rai.github.io/)

### Build
Easy build. Just run

```bash
python src/build.py
```

### Development
Install dependencies
```bash
poetry install --with dev
```

Watch changes

```bash
watchmedo shell-command --patterns="*" --recursive --command='python src/build.py' src
```

Launch web server

```bash
python -m http.server -d docs
```
