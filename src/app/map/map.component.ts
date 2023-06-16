import { Component, AfterViewInit, OnInit  } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-draw';
import { ShapeService } from '../shape.service';
import { PopupService } from '../popup.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnInit {
  map!: L.Map;
  x = 12.881906;
  y = 109.458933;

  streetMapLayer!: L.TileLayer;
  satelliteMapLayer!: L.TileLayer;
  topographicMapLayer!: L.TileLayer;
  NASAGIBS_ModisTerraTrueColorCR!: L.TileLayer;
  editableLayers: any;
  layerDrawer: any;

  private states;

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.x, this.y],
      zoom: 8
    });

    this.editableLayers = new L.FeatureGroup();
    // Set up the OSM layer
    L.control.layers({
      'osm': L.tileLayer(
        'http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'osm',
        maxZoom: 19,
        minZoom: 2
      }),
      "google": L.tileLayer(
        'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        attribution: 'google',
        maxZoom: 21,
        minZoom: 2
      }),
      "googleStreets": L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(this.map),
      "new": L.tileLayer(
        'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
        minZoom: 1,
        maxZoom: 16,
      }),
      "googleHybrid ": L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      "googleSat ": L.tileLayer(
        'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }),
      "Terrain": L.tileLayer(
        'http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    }, {
      'drawlayer': this.editableLayers.addTo(this.map)
    }, {
      position: 'topright', collapsed: true
    }).addTo(this.map);
  }

  //Tô màu
  private highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      fillOpacity: 0.5,
    });
  }

  // Cập nhật lại màu
  private resetFeature(e) {
    const layer = e.target;
    console.log(layer)
    layer.setStyle({
      fillOpacity: 0.2,
    });
  }

  // Chọn màu ngẫu nhiên
  private randomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  private initStatesLayer() {

    // Phân vùng dữ liệu định vị JSON chỉ định cụ thể ở Tiền Giang (states.features)
    const data = this.states.features.filter((feature: any) => {
      return feature.properties.Ten_Tinh === "Tiền Giang";
    });


    const colors = [ "green", "red", "blue", "orange", "purple", "yellow", "pink", "teal", "cyan", "magenta",
                      "lime", "indigo", "brown", "silver", "gold", "violet", "navy", "maroon", "olive",
                      "coral", "aquamarine", "plum", "slategray", "crimson", "chartreuse", "orchid",
                      "skyblue", "peru", "khaki", "salmon", "darkgreen", "tomato", "dodgerblue", "darkorange",
                      "mediumvioletred", "seagreen", "steelblue", "indianred", "mediumslateblue", "darkcyan", "chocolate", "limegreen",
    ];
    

    const temp = [
                  { 
                    "name": "abc",
                    "state": "123",
                    "population": "mno" 
                  }, 
                  {
                    "name": "abc1",
                    "state": "1234",
                    "population": "mno1"
                  }
                ]
                this.map.setView([this.x, this.y], 8); // Thêm dòng này để chuyển đến vị trí Tiền Giang

    for (const layer of data) {

      const color = this.randomElement(colors);
      console.log(layer);

      const tempLayer = L.geoJSON(layer, {
        //Duyệt qua JSON địa lý, đi qua từng features
        onEachFeature: (feature, layer) => {

          //Thiết lập sự kiện (on: mouseover, mouseout);
          layer.on({
            mouseover: (e) => (this.highlightFeature(e)),
            mouseout: (e) => (this.resetFeature(e)),
          });

          // layer.bindPopup(this.popupService.makeCapitalPopup(
          //   { "name": feature.properties.Ten_Tinh,
          //    "state": feature.properties.Ten_Huyen,
          //     "population": feature.properties.Dan_So 
          //   }));

          // Tạo nội dung markup dữ liệu

          const tooltipContent = `
            <div class="tooltip-info">
              <p><strong>${feature.properties.Ten_Huyen}</strong></p>
            </div>
      
        `;

        // Gắn tooltip với layer
        layer.bindTooltip(tooltipContent, { permanent: true, direction: 'center', className: 'custom-tooltip' });

        }

      });

      tempLayer.setStyle({
        weight: 3,
        opacity: 1,
        color: color,
        fillOpacity: 0.2,
        fillColor: color
      });
      
      this.map.addLayer(tempLayer);

    }
  }

  constructor(
    private shapeService: ShapeService,
    private popupService: PopupService
  ) {}
  
  ngOnInit(): void {
    // this.initMap();
    // this.shapeService.getStateShapes().subscribe(states => {
    //   this.states = states;
    //   this.initStatesLayer();
    // });
  
    // Fly to Tiền Giang
    // setTimeout(() => {
    //   this.map.flyTo([10.442054, 106.364861], 10, { duration: 2 });
    // }, 1000);
  }

  ngAfterViewInit(): void {
    this.initMap();
     setTimeout(() => {
      this.map.flyTo([10.442054, 106.364861], 10, { duration: 2 });
    }, 1000);
    this.shapeService.getStateShapes().subscribe(states => {
      this.states = states;
      console.log(states)
      this.initStatesLayer();
    });

    
  }
  
}