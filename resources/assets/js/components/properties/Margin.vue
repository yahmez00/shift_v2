<template>
    <div>
        <p class="style-panel-label">Margins</p>

        <div class="mb-2">
            <b-form-row>
                <b-col>
                    <label class="sub-label">Top</label>
                    <b-form-input
                        type="number"
                        v-model.number="marginTop"
                        :min="0"
                        :max="500"
                        @focusout.native="ensureValueIsNotEmpty('marginTop')"
                    ></b-form-input>
                </b-col>

                <b-col>
                    <label class="sub-label">Bottom</label>
                    <b-form-input
                        type="number"
                        v-model.number="marginBottom"
                        :min="0"
                        :max="500"
                        @focusout.native="ensureValueIsNotEmpty('marginBottom')"
                    ></b-form-input>
                </b-col>

                <b-col>
                    <label class="sub-label">Left</label>
                    <b-form-input
                        type="number"
                        v-model.number="marginLeft"
                        :min="0"
                        :max="500"
                        @focusout.native="ensureValueIsNotEmpty('marginLeft')"
                    ></b-form-input>
                </b-col>

                <b-col>
                    <label class="sub-label">Right</label>
                    <b-form-input
                        type="number"
                        v-model.number="marginRight"
                        :min="0"
                        :max="500"
                        @focusout.native="ensureValueIsNotEmpty('marginRight')"
                    ></b-form-input>
                </b-col>
            </b-form-row>
        </div>
    </div>
</template>

<script>
import TopbarButton from '../topbar/TopbarButton';
import NoEmptyValues from '../mixins/EnsureNoEmptyValues';

export default {
    name: "Margin",

    components: { TopbarButton },

    mixins: [NoEmptyValues],

    computed: {
        elementStyleIsSelected() {
            return this.$store.getters.selectedElementStyle === 'margin';
        },

        marginTop: {
            get() {
                return this.$store.getters.getSelectedElement.margin.top;
            },
            set(amount) {
                this.$store.commit('setComponentSubProperty', {
                    property: 'margin',
                    subproperty: 'top',
                    value: amount,
                });
            }
        },

        marginRight: {
            get() {
                return this.$store.getters.getSelectedElement.margin.right;
            },
            set(amount) {
                this.$store.commit('setComponentSubProperty', {
                    property: 'margin',
                    subproperty: 'right',
                    value: amount,
                });
            }
        },

        marginBottom: {
            get() {
                return this.$store.getters.getSelectedElement.margin.bottom;
            },
            set(amount) {
                this.$store.commit('setComponentSubProperty', {
                    property: 'margin',
                    subproperty: 'bottom',
                    value: amount,
                });
            }
        },

        marginLeft: {
            get() {
                return this.$store.getters.getSelectedElement.margin.left;
            },
            set(amount) {
                this.$store.commit('setComponentSubProperty', {
                    property: 'margin',
                    subproperty: 'left',
                    value: amount,
                });
            }
        },
    },

    methods: {
        setSelectedElementStyle(elementStyleName) {
            this.$store.commit('setSelectedElementStyle', elementStyleName);
        }
    }
}
</script>

