var express = require('express');
var mongoose  = require('mongoose');
const cors = require('cors');

var app = express();
app.use(cors());
var port = process.env.PORT || 3000;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://admin:pass@localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'commenting_on_comments'})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


app.use(express.json())


const commentSchema = new mongoose.Schema({
    data: Object
  });
const Comment = mongoose.model('comments', commentSchema);


app.post('/api/v1/comment/add', function (req, res) {
    const now = new Date();  
    data = [];
    comment = {
        id: Math.random().toString(36).slice(2),
        pid: req.body.pid,
        userName: req.body.userName,
        comment: req.body.comment,
        time: now.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }),
        date: now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' })
    }

    Comment.updateOne(
        { cid: 'coc' },
        { $set: { [`data.${comment.id}`]: comment } },
      ).then( (err, re) => {     
        res.status(200).send({
            "status": 'success',
            "message": 'comment updated successfully'
        })
      }).catch(err => console.error('Error saving document to collection:', err));

});

app.post('/api/v1/comment/update', function (req, res) {
    const now = new Date();  
    data = [];
    comment = {
        id: req.body.id,
        pid: req.body.pid,
        userName: req.body.userName,
        comment: req.body.comment,
        time: now.toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric' }),
        date: now.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: '2-digit' }),
        edited: true
    }

    Comment.updateOne(
        { cid: 'coc' },
        { $set: { [`data.${comment.id}`]: comment } },
      ).then( (err, re) => {
        res.status(200).send({
            "status": 'success',
            "message": 'comment updated successfully'
        })
      }).catch(err => console.error('Error saving document to collection:', err));

});


app.get('/api/v1/comment/list', async (req, res) => {
    try {
        const records = await Comment.find({}, {data: 1, _id: 0});
        res.json({'status': 'success', 'data': records[0].data});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
});

var server = app.listen(port, function() {
    console.log('Express server listening on port ' + port);
});