



window.eventHub = {
    events: {

    }, // hash
    emit(eventName, data){ //发布 到eventhub
      for(let key in this.events){
        if(key === eventName){
          let fnList = this.events[key]
          fnList.map((fn)=>{
            fn.call(undefined, data)
          })
        }
      }
    },
    on(eventName, fn){ //从eventhub上订阅，
      if(this.events[eventName] === undefined){
        this.events[eventName] = []
      }
      this.events[eventName].push(fn)
    },
  }