(function() {
    'use strict';

    angular.module('angularTask1', []);
})();
(function() {
    'use strict';

    angular.module('angularTask1').controller('CommentsListController', CommentsListController);

    function CommentsListController(commentsListFactory, COMMENTS_TYPES) {

        // CommentsListController.$inject = ['commentsListFactory', 'COMMENTS_TYPES'];

        const ctrl = this;

        ctrl.commentsTypes = COMMENTS_TYPES;
        ctrl.isEditPopupDisplayed = false;
        ctrl.commentForEditing = {};
        ctrl.commentsType = 'all';

        ctrl.getComments = commentsListFactory.getComments;
        ctrl.addComment = commentsListFactory.addComment;
        ctrl.toggleIsRemoved = commentsListFactory.toggleIsRemoved;
        ctrl.editComment = commentsListFactory.editComment;
        ctrl.editCommentConfirm = commentsListFactory.editCommentConfirm;
        ctrl.editCommentCancel = commentsListFactory.editCommentCancel;
        ctrl.updateLocalStorage = commentsListFactory.updateLocalStorage;

            if (localStorage.getItem('comments') && localStorage.getItem('comments') !== "undefined") {
                commentsListFactory.comments = JSON.parse(localStorage.getItem('comments'));
            } else {
                ctrl.updateLocalStorage();
            }

            ctrl.comments = commentsListFactory.comments;


    }

})();

(function() {
    'use strict';

    angular.module('angularTask1').component('commentsList', {
        templateUrl: 'components/comments-list/comments-list.view.html',
        controller: 'CommentsListController',
        controllerAs: 'ctrl'
    });
})();

(function() {
    'use strict';

    angular.module('angularTask1').constant("COMMENTS_TYPES", ['all', 'archived', 'existing']);
})();

(function() {
    'use strict';

    function commentsListFactory() {

        const calService = {};

        calService.comments = [
            {
                text: "Nice...", username: "Vera",
                creationDate: new Date(), editDate: '',
                isRemoved: false, isEdited: false
            },
            {
                text: "Dumb", username: "Elena",
                creationDate: new Date(), editDate: new Date(),
                isRemoved: false, isEdited: true
            },
            {
                text: "Dope", username: "Alexandr",
                creationDate: new Date(), editDate: '',
                isRemoved: true, isEdited: false
            },
            {
                text: "Brilliant", username: "Alexei",
                creationDate: new Date(), editDate: '',
                isRemoved: false, isEdited: false
            },
            {
                text: "Generic", username: "Anthony",
                creationDate: new Date(), editDate: '',
                isRemoved: true, isEdited: false
            },
            {
                text: "Outstanding", username: "Jack",
                creationDate: new Date(), editDate: '',
                isRemoved: false, isEdited: false
            },
            {
                text: "Borring", username: "Eva",
                creationDate: new Date(), editDate: '',
                isRemoved: false, isEdited: false
            }];

        calService.getComments = (type) => {
            switch (type) {
                case 'all':
                    return calService.comments;
                case 'archived':
                    return calService.comments.filter(x => x.isRemoved);
                case 'existing':
                    return calService.comments.filter(x => !x.isRemoved);
            }
        };

        calService.addComment = (username, comment) => {
            // const newComment = new Comment(comment, username, new Date());
            const newComment = {
                text: comment,
                username: username,
                creationDate: new Date(),
                editDate: '',
                isRemoved: false,
                isEdited: false
            }
            calService.comments.push(newComment);
            calService.updateLocalStorage();
        };

        calService.toggleIsRemoved = (comment) => {
            const index = calService.comments.indexOf(comment);
            calService.comments[index].isRemoved = !calService.comments[index].isRemoved;
            calService.updateLocalStorage();
        };

        calService.editComment = (comment) => {
            const index = calService.comments.indexOf(comment);
            calService.commentForEditing = calService.comments[index];
            calService.isEditPopupDisplayed = true;

            calService.editCommentConfirm = (username, comment) => {
                updateComment(index, username, comment);
                calService.isEditPopupDisplayed = false;
                calService.updateLocalStorage();
            };
        };

        calService.editCommentCancel = () => {
            calService.isEditPopupDisplayed = false;
        };

        const updateComment = (index, username, comment) => {
            calService.comments[index].text = comment ?
                comment : calService.comments[index].text;
            calService.comments[index].username = username ?
                username : calService.comments[index].username;
            calService.comments[index].isEdited = true;
            calService.comments[index].editDate = new Date();
        };

        calService.updateLocalStorage = () => {
            localStorage.removeItem('comments');
            localStorage.setItem('comments', JSON.stringify(calService.comments));
        };

        return calService;
    }

    angular.module('angularTask1').factory('commentsListFactory', commentsListFactory);
})();

(function() {
    'use strict';

    angular.module('angularTask1').directive('val', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attributes, control) {
                control.$validators.val = function (modelValue, viewValue) {

                    const helloRegExp = new RegExp('^hello');

                    const commentText = String(viewValue).toLowerCase();

                    return helloRegExp.test(commentText);
                };
            }
        };
    });
})();
