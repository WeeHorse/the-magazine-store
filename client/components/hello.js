const HelloComponent = {

  template: `
    <div>
      <h1>{{title}}</h1>
      <p>{{description}}</p>
    </div>
  `,
  data(){
    return{
      title: "Welcome to The Magazine Store",
      description: "The greatest mag store on the east side"
    }
  }

}