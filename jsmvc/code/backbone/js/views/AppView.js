(function(){
    window.AppView = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            console.log('AppView initialize');
            this.render();
        },
        render: function () {
            var agentView = new AgentsView();
            var agentTableView = new AgentTableView();
            console.log('AppView render');
        }
    });
}());
