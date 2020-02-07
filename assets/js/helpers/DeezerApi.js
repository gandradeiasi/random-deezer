id_maximo = 875000000;
url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com";

class DeezerApi {
    static busca_musica(id) {
        return new Promise((resolve, reject) => {
            fetch(url + "/track/" + id)
                .then(x => x.json())
                .then(x => {
                    if (!x.error) resolve(x);
                    else resolve(this.busca_musica(id));
                });
        });
    }

    static sorteia_musica() {
        return new Promise((resolve, reject) => {
            fetch(url + "/track/" + (parseInt(Math.random() * id_maximo) + 1))
                .then(x => x.json())
                .then(x => {
                    if (!x.error && x.available_countries.length > 0) resolve(x);
                    else resolve(this.sorteia_musica());
                });
        });
    }
}
