import Vue from 'vue'

Vue.mixin({
    data: function() {
        return {
            codenames: ["Sugarplum", "Dash", "Peppermint", "Frosty", "Snowflake", "Gumdrop", "Truffle",
                "Tinsel", "Marshmallow", "Giggles", "Gizmo", "Buttons", "Candy Cane", "Mittens", "Pudding", "Cookie",
                "Jingles", "Bubbles", "Twinkle", "Pinecone", "Icicle", "Sprinkles", "Chestnut", "Freeze", "Nutcracker"
            ]
        }
    },
    methods: {
        postMethod(path, data, axiosConfig) {
            data["mall_id"] = this.$store.state.property.id;
            data["signature"] = this.$store.state.property.api_key;
            data["timestamp"] = new Date();
            return this.$store.dispatch("POST", {
                path: path,
                data: data,
                axiosConfig: axiosConfig
            });
        },
        getCharacterName(id) {
            return this.characters[id].character_name;
        },
        getCharacterFromName: function(character_name) {
            for (let character of this.$store.state.characters) {
                if (character.character_name == character_name) {
                    return character;
                }
            }
        },
        getCodeName() {
            return this.codenames[Math.floor(Math.random() * 24)];
        },
        getAlphaNumeric(length) {
            return Math.random().toString(36).slice(2, length + 2);
        },
        setCookies(name, val) {
            this.$cookies.set(name, val);
        },
        getCookies(name) {
            return this.$cookies.get(name);
        }
    }
})