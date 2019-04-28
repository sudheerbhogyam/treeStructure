import { Component, ViewChild } from '@angular/core';
import { TreeComponent, ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {


  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  title = 'treeStructure';
  nodes = [
    {
      "uuid" :"1",
      name: 'Root Section',
      isTerminal: false,
      children: [
        { name: 'Section 1.1',"uuid" :"1.1" ,isTerminal: true},
        { name: 'Section 1.2',"uuid" :"1.2" }
      ]
     },
    // {
    //   name: 'Section 2',
    //   "uuid" :"2",
    //   children: [
    //     { name: 'Section 2.1',"uuid" :"2.1",children: [] },
    //     { name: 'Section 2.2',"uuid" :"2.2", children: [
    //       {name: 'Section 2.2.1',"uuid" :"2.2.1"}
    //     ] }
    //   ]
    // },
    // { name: 'Section 3' ,"uuid" :"3"},
    // { name: 'Section 4',"uuid" :"4", children: [] },
    // { name: 'Section 5', "uuid" :"5",children: null }
  ];
  options: ITreeOptions = {
    
    displayField: 'name' ,
    isExpandedField: 'expanded',
    animateExpand : true,
    animateSpeed: 2,
    // idField: 'uuid',
    hasChildrenField: 'nodes',
    
  
  };


  addNode(node: any) {

    if(! node.data.children){
      node.data.children=[];
    }

    
    node.data.children.push({ name: 'New Section',isTerminal: false,children: []});

    if(node.data.isTerminal){
      node.data.children= [];
    }
    this.tree.treeModel.update();
    

    const someNode = this.tree.treeModel.getNodeById(node.id);
    someNode.expand();
  }


editNode(node: any){
  if(node){
    var name:String = window.prompt("Section Name : ", node.data.name );
    

    node.data.name= name && name.trim() ? name : node.data.name;
    node.data.isTerminal=window.confirm("Is terminal ? : ");

    if(node.data.isTerminal){
      if(node.data.children && node.data.children.length > 0 && window.confirm("Do you want to Delete All Sub Sections ?") )
        node.data.children= [];
    }
    this.tree.treeModel.update();

  }

}

  deleteNode(node :any){
    
      if(node.findPreviousNode(true)){
        var children = node.findPreviousNode(true).data.children;

        if(! node.findPreviousNode(true).data.children){
          node.findPreviousNode(true).data.children= [];
          children=[];
        }

        node.findPreviousNode(true).data.children = children.filter(data =>!(data == node.data));
        this.tree.treeModel.update();
      }else{
        this.nodes.filter(data => !(node.data))
      }
  }
}
