import Vue from 'vue'

Vue.mixin({
    methods: {
        commonMethod: function() {
            alert("Mithun");
        },
        postMethod(path, data) {
            data["mall_id"] = this.$store.state.property.id;
            data["signature"] = this.$store.state.property.api_key;
            data["timestamp"] = new Date();
            return this.$store.dispatch("POST", {
                path: path,
                data: data
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
        }
    }
})