function Place (args){
      this.localid = args[0];
      this.id = args[1];
      this.name = args[2];
      this.address = args[3];
      this.contact = args[4];
      this.rating = args[5];
      this.desc = args[6];
      this.path = args[7];
      this.visible = args[8];
      this.schedule = args[9];
      this.gps = args[10];
      this.type = args[11];
      this.facebook = args[12];
      this.url = args[13]
    }

    /*getProject(name) {
        return this.projects[name];
    }*/


module.exports = Place;


//Private
//var privateVariable = true;

//Public
/*module.exports = {
 Place: (...args) => {

console.log(args[0]);

    this.localid = args[0];
    this.id = args[1];
    this.name = args[2];
    this.address = args[3];
    this.contact = args[4];
    this.rating = args[5];
    this.desc = args[6];
    this.path = args[7];
    this.visible = args[8];
    this.schedule = args[9];
    this.gps = args[10];


}*/
