/*
 * @Author: your name
 * @Date: 2018-12-24 17:44:00
 * @LastEditTime: 2020-08-15 20:58:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-component-book-master/src/mixins/emitter.js
 */
function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
        const name = child.$options.name;
        if (name === componentName) {
            child.$emit(eventName, params);
        } else {
            broadcast.apply(child, [componentName, eventName].concat(params));
        }
    });
}

export default {
    methods: {
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;
            let name = parent.$options.name;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                if (parent) {
                    name = parent.$options.name;
                }
            }
            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        broadcast(componentName, eventName, params) {
            broadcast.call(this, componentName, eventName, params);
        }
    }
};