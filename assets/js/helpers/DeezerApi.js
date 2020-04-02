class DeezerApi {
    static busca_musica(id) {
        return new Promise((resolve, reject) => {
            fetch(g_url + "/track/" + id)
                .then(x => x.json())
                .then(x => {
                    if (!x.error) resolve(x);
                    else resolve(this.busca_musica(id));
                });
        });
    }

    static sorteia_musica() {
        return new Promise((resolve, reject) => {
            fetch(g_url + "/track/" + (parseInt(Math.random() * g_id_maximo) + 1))
                .then(x => x.json())
                .then(x => {
                    if (!x.error && x.available_countries.length > 0) resolve(x);
                });
        });
    }
}
