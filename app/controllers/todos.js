
var Todos = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    this.respond({todos: geddy.todos});
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var todo = geddy.model.Todo.create({title: params.title
                                       , id: geddy.string.uuid(10)
                                       , status: 'open'});
      if(todo.isValid()){
          todo.save();
          this.redirect({controller: this.name});
      }else{
          this.redirect({controller: this.name, action: 'add?error=true'});


      }

    // Save the resource, then display index page
    this.redirect({controller: this.name});

  };

  this.show = function (req, resp, params) {
      var self = this;
      geddy.model.adapter.Todo.load(params.id, function(todo){
          self.respond({todo: todo});

      });
  };

  this.edit = function (req, resp, params) {
    this.respond({params: params});
  };

    this.update = function (req, resp, params) {
        var self = this;
        geddy.model.adapter.Todo.load(params.id, function (todo) {
            todo.status = params.status;
            todo.title = params.title;
            todo.save(function (err, data) {
                if (err) {
                    params.errors = err;
                    self.transfer('edit');
                }
                else {
                    self.redirect({controller: self.name});
                }
            });
        });
    };

  this.remove = function (req, resp, params) {
    this.respond({params: params});
  };

};

exports.Todos = Todos;

