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
      name: 'Root Section',
      isTerminal: false,
      children: [
        { name: 'Section 1.1',isTerminal: true},
        { name: 'Section 1.2'}
      ]
     },
    
  ];
  options: ITreeOptions = {
    
    displayField: 'name' ,
    isExpandedField: 'expanded',
    animateExpand : true,
    animateSpeed: 2,
    // idField: 'uuid',
    hasChildrenField: 'nodes',
    
  
  };
// Add node method

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

//  Edit node method
editNode(node: any){
  if(node){
  
    this.tree.treeModel.update();

  }

}
// Delete node method
  deleteNode(node :any){
      console.log(node.data)
      console.log(node.parent.data)
      if(node.parent){
        var children = node.parent.data.children;

        if(! node.parent.data.children){
          node.parent.data.children= [];
          children=[];
        }

        node.parent.data.children = children.filter(data =>!(data == node.data));
        this.tree.treeModel.update();
      }else{
        console.log("Else")
        this.nodes= this.nodes.filter(data => !(node.data))
        this.tree.treeModel.update();
      }
  }
}
