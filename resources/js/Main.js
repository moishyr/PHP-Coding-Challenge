import axios from 'axios';

export default {
    data() {
        return {
            loading: true,
            colors: [],
            isVisible: false,
        };
    },

    computed: {
        // total() {
        //     return this.colors.reduce((total, color) => total + (color.total ? color.total : 0), 0);
        // }
    },

    methods: {
        getVotes(colorId, index) {
            this.isVisible = false;
            this.$set(this.colors[index], 'loadingVotes', true);

            axios.get(`/api/votes/${colorId}`)
                .then(({ data }) => {
                    this.colors[index].total = data;
                    this.$set(this.colors[index], 'loadingVotes', false);
                })
                .catch(console.log)
        },

        total() {
            return this.colors.reduce((total, color) => total + (color.total ? color.total : 0), 0).toLocaleString();
        }
    },

    mounted() {
        axios.get('/api/colors')
            .then(({ data }) => {
                this.colors = data;
                this.loading = false;
            })
            .catch(console.log)
    }
}
