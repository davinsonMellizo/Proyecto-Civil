import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import {MatSelectModule} from '@angular/material/select';


declare const Konva: any;
let ng: any;
let layer: any;
let stage: any;
let tempLayer: any;
let puntos: any;
let lineaselec: any;

@Component({
  selector: 'app-lienzo',
  templateUrl: './lienzo.component.html',
  styleUrls: ['./lienzo.component.css']
  
})
export class LienzoComponent implements OnInit {
  dibujando = false;
  puertaID=0;
  ventanaID=0;
  values = '';
  posInicial = "";
  posMouse = "";
  posFinal = "";
  checkPintar=true;
  selectedElement="";
  posXI = 0;
  posYI = 0;
  posXM = 0;
  posYM = 0;
  posXF = 0;
  posYF = 0;
  moviendo=false;
  targe;
  a=[];
  idLinea=0;
  entra="no";
  atrrLinea ="";
 
  public width = 800;
  public height = 200;
  public foto: any = [];
  constructor() { }
  onKey(event: any) { // without type info
    
    var pun=lineaselec.points();
    if(pun[2]!=pun[0]){
      pun[2]=puntos[0]+parseInt(event.target.value);
    }else{
      pun[3]=puntos[1]+parseInt(event.target.value);
    }
    lineaselec.setAttr("fillPatternScaleY",event.target.value)
    this.values += lineaselec.points() + ' | ';
    layer.draw();
  }
  tamanoVentana(event: any) {
    
    var pun=lineaselec.points();
    if(pun[2]!=pun[0]){
      pun[2]=puntos[0]+parseInt(event.target.value);
    }else{
      pun[3]=puntos[1]+parseInt(event.target.value);
    }
    lineaselec.setAttr("fillPatternScaleY",event.target.value)
    this.values += lineaselec.points() + ' | ';
    layer.draw();
  }
  public changeStatus(){
    var grupos = layer.getChildren(function(node){
      return node.getClassName() == 'Group';
    });
    
    grupos.forEach(element => {
      var hijos=element.getChildren;
      
      var lineas = element.getChildren(function(node){
        return node.getClassName() == 'Line';
      });
      lineas.forEach(element1 => {
        if(element1.getAttr("name")==lineaselec.getAttr("name")){
          element.destroy();
        }
      });    
    });
    if(this.checkPintar){
      this.checkPintar=false;
      document.body.style.cursor = 'pointer';
    }else{
      this.checkPintar=true;
      document.body.style.cursor = 'default';
    }
  }
  public configStage: Observable<any> = of({
    width: this.width,
    height: this.height,
    Container:'container'
  });
  
 public openBottomSheet(){
  
  var borrar = layer.getChildren(function(node){
    return node.getClassName() == 'Group';
  });
  
  borrar.forEach(element => {
    var hijos=element.getChildren;
    
    var borrar1 = element.getChildren(function(node){
      return node.getClassName() == 'Line';
    });
    borrar1.forEach(element1 => {
      if(element1.getAttr("name")==lineaselec.getAttr("name")){
        element.destroy();
      }
    });    
  });
  layer.draw();
 }
 public agregarVentana(){
  var borrar = layer.getChildren(function(node){
    return node.getClassName() == 'Group';
  });
   
  borrar.forEach(element => {
    var hijos=element.getChildren;
    
    var borrar1 = element.getChildren(function(node){
      return node.getClassName() == 'Line';
    });
    borrar1.forEach(element1 => {
      if(element1.getAttr("name")==lineaselec.getAttr("name")){
        var ancho, alto;
        if(this.a[0]==this.a[2]){
          ancho=9;
          alto=50;
        }else{
          alto=9;
          ancho=50;
        }
        var box = new Konva.Rect({
          x: this.a[0],
          y: this.a[1],
          width: ancho,
          height: alto,
          name: 'ventana'+this.ventanaID,
          fill: 'green',
          strokeWidth: 4
        });
        element.add(box);
      }
    });    
  });
  this.ventanaID+=1;
  layer.draw();
 }
 public agregarPuerta(){
  var borrar = layer.getChildren(function(node){
    return node.getClassName() == 'Group';
  });
   
  borrar.forEach(element => {
    var hijos=element.getChildren;
    
    var borrar1 = element.getChildren(function(node){
      return node.getClassName() == 'Line';
    });
    borrar1.forEach(element1 => {
      if(element1.getAttr("name")==lineaselec.getAttr("name")){
        var ancho, alto;
        if(this.a[0]==this.a[2]){
          ancho=9;
          alto=50;
        }else{
          alto=9;
          ancho=50;
        }
        var box = new Konva.Rect({
          x: this.a[0],
          y: this.a[1],
          width: ancho,
          height: alto,
          name: 'puerta'+this.puertaID,
          fill: 'yelow',
          strokeWidth: 4
        });
        element.add(box);
      }
    });    
  });
  this.puertaID+=1;
  layer.draw();
 }
  public handleClick(){
    if(this.checkPintar){
      if(!ng.moviendo){
        this.dibujando = true;
        const mousePos = stage.getPointerPosition();
        const x = mousePos.x;
        const y = mousePos.y;
        this.posXI = mousePos.x;
        this.posYI = mousePos.y;
        this.posInicial ='x: ' + x + ', y: ' + y;
        //const layer1 = ng.layer.getStage();
        var redLine = new Konva.Line({
          points: [x, y, x, y],
          stroke: 'red',
          strokeWidth: 15,
          lineCap: 'round',
          lineJoin: 'round',
          name: 'linea ' + this.idLinea,
          draggable: true
        });
        layer.add(redLine);
      }
    }
  }

  
  public handleMouseMove() {
    if(!ng.moviendo){
      if(this.dibujando ){
        const mousePos = stage.getPointerPosition();
        //const layer = ng.layer.getStage();
    
        const p = layer.getChildren();
        var lines = layer.getChildren(function(node){
          return node.getClassName() === 'Line';
        });
        const x = mousePos.x;
        const y = mousePos.y;
        this.posXM = mousePos.x;
        this.posYM = mousePos.y;
        this.posMouse ='x: ' + (this.posXM-this.posXI) + ', y: ' + (this.posYM-this.posYI);
       
        this.atrrLinea = lines[(lines.length-1)].getAttr("points");
        if((this.posXM-this.posXI)*(this.posXM-this.posXI)>(this.posYM-this.posYI)*(this.posYM-this.posYI)){
          this.a = [this.posXI,this.posYI,this.posXM,this.posYI];
        }else{
          this.a = [this.posXI,this.posYI,this.posXI,this.posYM];
        }
        
        lines[lines.length-1].setAttr("points",this.a);
        layer.draw();
      }
    }       
  }

  public handleMouseOut() {
    if(this.checkPintar){
      if(!ng.moviendo){
        this.dibujando = false;
        const mousePos = stage.getPointerPosition();  
        const p = layer.getChildren();
        var lines = layer.getChildren(function(node){
          return node.getClassName() === 'Line';
        });
        const x = mousePos.x;
        const y = mousePos.y;
        var group = new Konva.Group({
          draggable: true
        });
        var group = new Konva.Group({
          draggable: true
        });
        var redLine = new Konva.Line({
          points: this.a,
          stroke: 'red',
          strokeWidth: 15,
          lineCap: 'round',
          lineJoin: 'round',
          name: 'linea ' + this.idLinea
          
        });
        
        group.add(redLine);
        
        this.idLinea+=1;
        
        group.on('mouseover', function() {
          document.body.style.cursor = 'pointer';
          
          ng.moviendo=true;
          layer.draw();
        });
        group.on('mouseout', function() {
          document.body.style.cursor = 'default';
          ng.moviendo=false;
          layer.draw();
        });
        layer.add(group);
        
        layer.draw();
        var borrar = layer.getChildren(function(node){
          return node.getClassName() === 'Line';
        });
      
        var nodoABorrar = borrar[0];
        nodoABorrar.remove();
        console.log("tamanio 2: ",borrar.length);
        layer.draw();
        this.posFinal ='x: ' + x + ', y: ' + y;
      }
    }    
  }

  public configLine: Observable<any> = of({
    points: [50, 50,20,50],
    stroke: 'red',
    strokeWidth: 15,
    lineCap: 'round',
    lineJoin: 'round',
    draggable: true
  });
  
 
  
  ngOnInit() {
    ng = this;
    var width = window.innerWidth;
    var height = window.innerHeight-150;
    stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
    layer = new Konva.Layer();
    stage.add(layer);
    tempLayer = new Konva.Layer();
    stage.add(tempLayer);
    var text = new Konva.Text({
      fill: 'black'
    });
    layer.add(text);
    //layer.draw();
    stage.on('click', function(e) {
      if(e!=null){
        text.text('clipe points: ' + e.target.getAttr("points"));
        puntos=e.target.getAttr("points");
        lineaselec=e.target;
        var grupos = layer.getChildren(function(node){
          return node.getClassName() == 'Group';
        });
        grupos.forEach(element => {
          var lines = element.getChildren(function(node){
            return node.getClassName() == 'Line';
          });
          lines.forEach(element1 => {
            element1.setAttr("stroke",'red');
          });
        });
        
        lineaselec.setAttr("stroke",'blue');
        layer.draw();
        
      }
    });

    //estas 
    
    stage.on('dragstart', function(e) {
      e.target.moveTo(tempLayer);
      text.text('Moving ' + e.target.name());
      layer.draw();
    });

    var previousShape;
    stage.on('dragmove', function(evt) {
      var pos = stage.getPointerPosition();
      var shape = layer.getIntersection(pos);
      if (previousShape && shape) {
        if (previousShape !== shape) {
          // leave from old targer
          previousShape.fire(
            'dragleave',
            {
              type: 'dragleave',
              target: previousShape,
              evt: evt.evt
            },
            true
          );

          // enter new targer
          shape.fire(
            'dragenter',
            {
              type: 'dragenter',
              target: shape,
              evt: evt.evt
            },
            true
          );
          previousShape = shape;
        } else {
          previousShape.fire(
            'dragover',
            {
              type: 'dragover',
              target: previousShape,
              evt: evt.evt
            },
            true
          );
        }
      } else if (!previousShape && shape) {
        previousShape = shape;
        shape.fire(
          'dragenter',
          {
            type: 'dragenter',
            target: shape,
            evt: evt.evt
          },
          true
        );
      } else if (previousShape && !shape) {
        previousShape.fire(
          'dragleave',
          {
            type: 'dragleave',
            target: previousShape,
            evt: evt.evt
          },
          true
        );
        previousShape = undefined;
      }
    });
    stage.on('dragend', function(e) {
      var pos = stage.getPointerPosition();
      var shape = layer.getIntersection(pos);
      if (shape) {
        previousShape.fire(
          'drop',
          {
            type: 'drop',
            target: previousShape,
            evt: e.evt
          },
          true
        );
      }
      previousShape = undefined;
      e.target.moveTo(layer);
      layer.draw();
      tempLayer.draw();
    });

    stage.on('dragenter', function(e) {
      e.target.fill('green');
      text.text('dragenter ' + e.target.name());
      layer.draw();
    });

    stage.on('dragleave', function(e) {
      e.target.setAttr("stroke",'red');
      text.text('dragleave ' + e.target.name());
      lineaselec.setAttr("stroke",'blue');
      layer.draw();
    });

    stage.on('dragover', function(e) {
      e.target.setAttr("stroke",'green');
      lineaselec.setAttr("stroke",'blak');
      var puntosE=e.target.getAttr("points");
      var puntosSelec=lineaselec.getAttr("points");
      var aux;
      /*if(puntosE[0]==puntosE[2] && puntosSelec[0]==puntosSelec[2]){
        aux=[puntosE[1],puntosE[3],puntosSelec[1],puntosSelec[3]].sort();
        if(puntosE[1]==aux[3] || puntosE[3]==aux[3]){
          
        }else{

        }
      }else{
        if(puntosE[1]==puntosE[3] && puntosSelec[1]==puntosSelec[3]){

        }else{
          if(puntosE[1]==puntosE[3] && puntosSelec[1]==puntosSelec[3]){
            
          }else{
            if(puntosE[0]==puntosE[2]){
              
            }else{

            }
          } 
        } 
      }*/
      text.text('dragover ' + e.target.name());
      layer.draw();
    });

       
  }
}
