class Controller {
    constructor() {
        this.tabela_musica = new TabelaMusica();
        this.view = new View();
        this.input_numero_abas = document.querySelector("#numero_abas");
        this.input_unraked_only = document.querySelector("#unranked_only");
        this.input_include_explicit = document.querySelector("#include_explicit");
        this.unranked_only = false;
        this.include_explicit = false;
        this.pode_renderizar = true;
    }

    init() {
        setInterval(() => {
            for (let i = 0; i < 50; i++)
                this._inicia_buscador_aleatorio();
        }, 5000);

        this._renderiza();

        setInterval(() => this.pode_renderizar = true, 2000);

        this.input_unraked_only.onchange = () => {
            if (this.input_unraked_only.checked) {
                this.tabela_musica.musicas = this.tabela_musica.musicas.filter(x => x.rank == 0);
                this.unranked_only = true;
            }
            else this.unranked_only = false;
        }

        this.input_include_explicit.onchange = () => {
            if (!this.input_include_explicit.checked) {
                this.tabela_musica.musicas = this.tabela_musica.musicas.filter(x => !x.explicit);
                this.include_explicit = false;
            }
            else this.include_explicit = true;
        }

        document.querySelector("#botao").onclick = () => this.abre_abas();
        document.onclick = (event) => {
            if (event.toElement.tagName == "TH") {
                this.tabela_musica.order(false, event.toElement.getAttribute('value'));
                this._renderiza();
            }
        }
    }

    abre_abas() {
        let numero_abas = this.input_numero_abas.value;
        for (let i = 0; i < (this.tabela_musica.length < numero_abas ? this.tabela_musica.length : numero_abas); i++) {
            let new_window = window.open(this.tabela_musica.musicas[0].link);
            if (new_window) this.tabela_musica.musicas.shift();
        }
    }

    _adiciona_musica(musica) {
        let durationSeconds = parseInt(musica.duration);

        if (durationSeconds >= g_minDurationSeconds &&
            durationSeconds <= g_maxDurationSeconds &&
            !this._contem_string_proibida(musica.artist) &&
            !this._contem_string_proibida(musica.album) &&
            !this._contem_string_proibida(musica.title)
        ) {
            this.tabela_musica.adiciona_musica(musica);
            this.tabela_musica.order(true);
            if (this.pode_renderizar) {
                this._renderiza();
                this.pode_renderizar = false;
            }
        }
    }

    _contem_string_proibida(string) {
        for (let i = 0; i < g_strings_proibidas.length; i++) {
            if (string.toLowerCase().includes(g_strings_proibidas[i]))
                return true;
        }
        return false;
    }

    _renderiza() {
        this.view.renderiza_table(this.tabela_musica.musicas);

        document.querySelectorAll('.remove-music')
            .forEach(x =>
                x.onclick = () => {
                    if (x.value)
                        this.tabela_musica.musicas = this.tabela_musica.musicas.filter(y => y.link != x.value)
                    else if (x.href)
                        this.tabela_musica.musicas = this.tabela_musica.musicas.filter(y => y.link != x.href)
                    this._renderiza();
                }
            );
        document.querySelectorAll('img')
            .forEach(x => {
                x.addEventListener("error", () => {
                    x.src = x.src.split("?")[0] + "?" + new Date().getTime();
                });
            });

        this.view.renderiza_total(this.tabela_musica.musicas);
    }

    _inicia_buscador_aleatorio() {
        DeezerApi.sorteia_musica()
            .then(x => {
                if (!((this.unranked_only && x.rank != 0) || (!this.include_explicit && x.explicit_lyrics)))
                    this._adiciona_musica(new Musica(x));
            });
    }
}