import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faUserPlus, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

library.add(fasHeart, farHeart);
library.add(faUserPlus);
library.add(faUserMinus);
library.add(faPen);

Vue.component('font-awesome-icon', FontAwesomeIcon);
