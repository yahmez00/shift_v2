<template>
    <div>
        <p class="style-panel-label">Width (%)</p>

        <b-form-input
            type="number"
            v-model.number="width"
            @focusout.native="ensureValueIsNotEmpty('width', 100)"
            :min="1"
            :max="100"
        ></b-form-input>
    </div>
</template>

<script>
import NoEmptyValues from '../mixins/EnsureNoEmptyValues';

export default {
    name: "Width",

    mixins: [NoEmptyValues],

    computed: {
        width: {
            get() {
                return this.$store.getters.getSelectedElement.width;
            },
            set(width) {
                this.$store.commit('setComponentProperty', { property: 'width', value: width });
            }
        }
    }
}
</script>

<style scoped>

</style>
