<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import axios from 'axios'
import VueApexCharts from "vue3-apexcharts";
import {ref, onMounted} from "vue"

DataTable.use(DataTablesCore);

const url='http://api_ejec.redcusconorte.gob.pe/api/';
const columns=[{data:'fuente'},{data:'pia',className:'derecha'},{data:'pim',className:'derecha'},{data:'devengado',className:'derecha'},{data:'saldo',className:'derecha'},{data:'avance',className:'derecha'}]
const columns_prog=[{data:'programa'},{data:'pia',className:'derecha'},{data:'pim',className:'derecha'},{data:'devengado',className:'derecha'},{data:'avance',className:'derecha'}]
const columns_gen=[{data:'generica'},{data:'pia',className:'derecha'},{data:'pim',className:'derecha'},{data:'devengado',className:'derecha'},{data:'saldo',className:'derecha'},{data:'avance',className:'derecha'}]
const opciones={responsive:true, autowidth:false, language:{search:'Buscar', decimal:'.',thousands:',', lengthMenu:'Mostrando _MENU_ registros por pagina', zeroRecords:'No hay registros que mostrar', info:'Mostrando _START_ a _END_ de _TOTAL_ registros', infoEmpty:'Mostrando registros del 0 al 0 de un total de 0 registros',
infoFiltered:'(filtrado de un total de _MAX_ registros)',paginate:{firts:'Primero', previous:'Anterior', next:'Siguiente', last:'Ultimo'}} }

let dat_gen=ref([])
let pia=ref(0);
let pim=ref(0);
let dev=ref(0);
let avc=ref(0);
let avc_fte=ref([])
let avc_gen=ref([])
let categ=ref([])
let datos=ref([])
let categ_prog=ref([])
let datos_prog=ref([])
let categ_gen=ref([])
let datos_gen=ref([])
let chartOptions=ref([])
let series=([])
let chartOptions_ro=ref([])
let chartOptions_rdr=ref([])
let chartOptions_dt=ref([])
let chartOptions_rd=ref([])
let chartOptions_gen1=ref([])
let chartOptions_gen3=ref([])
let chartOptions_gen5=ref([])
let chartOptions_gen6=ref([])
let series_ro=([])
let series_rdr=([])
let series_dt=([])
let series_rd=([])
let series_gen1=([])
let series_gen3=([])
let series_gen5=([])
let series_gen6=([])

let cat1=([])
let dat1=([])
let cat1_prog=([])
let dat1_prog=([])
let cat1_gen=([])
let dat1_gen=([])
let avc_prog=ref([])

async function get_dat_gen(){
  try {
      const response = await axios.get(url+'datos_generales')
      dat_gen.value = response.data
      pia.value=dat_gen.value[0].pia;
      pim.value=dat_gen.value[0].pim;
      dev.value=dat_gen.value[0].devengado;
      avc.value=dat_gen.value[0].avance;
    } catch (e) {
      error.value = e
    }
}

async function get_avance_fuente(){
  try {
      const response = await axios.get(url+'ejec_fuente')
      avc_fte.value = response.data
      categ.value=avc_fte.value.map((element)=>{
        return element.fuente;
      })

      datos.value=avc_fte.value.map((element)=>{
        return element.avance;
      })

    } catch (e){
      console.log(e);
    } 
    cat1=Object.values(categ.value);
    dat1=Object.values(datos.value);

    series_ro=dat1.slice(0,1)
    series_rdr=dat1.slice(1,2)
    series_dt=dat1.slice(2,3)
    series_rd=dat1.slice(3,4)
}


async function get_avance_programa(){
  try {
      const response = await axios.get(url+'ejec_programa')
      avc_prog.value = response.data
      console.log("avc_prog:",avc_prog.value)
      categ_prog.value=avc_prog.value.map((element)=>{
        return element.programa;
      })

      datos_prog.value=avc_prog.value.map((element)=>{
        return element.avance;
      })

    } catch (e){
      console.log(e);
    } 
    cat1_prog=Object.values(categ_prog.value);
    dat1_prog=Object.values(datos_prog.value);

    chartOptions.categories=cat1_prog;
    series.data=dat1_prog;
    chartOptions= {
        xaxis: {
          categories: cat1_prog,
        },
      }
    series= [
        {
          data: dat1_prog,
        },
      ]
}

chartOptions= {
    chart: {
      type:'bar',
      id: "ejecucion 2023",
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    colors: ['#17ead9'],
    grid: {
      borderColor: "#40475d",
      backgroudBarColors:'#40475d'
    },
    plotOptions: {
      bar: {
            borderRadius: 5,
            horizontal: true,
            barHeight:'90%',
            columnWidth:'90%',
            dataLabels:{
              position:'top'
            },
            colors:{
              backgroudBarColors:['#40475d']
            }
          }

    },
    dataLabels: {
      enabled: true,
      barHeight: '100%',
      style: {
        fontSize: '18px',
        colors:['#333']
      },
      offsetX:50
    },

    xaxis: {
      categories: [],
      axisBorder: {
                show: true
            },
      axisTicks: {
          show: true
      }
    },
    yaxis: {
            max: 100,
        }
}

series= [
        {
          name: "Ejecución",
          data: [],
        },
      ]


async function get_avance_generica(){
  try {
      const response = await axios.get(url+'ejec_generica')
      avc_gen.value = response.data
      console.log("avc_gen:",avc_gen.value)
      categ_gen.value=avc_gen.value.map((element)=>{
        return element.generica;
      })

      datos_gen.value=avc_gen.value.map((element)=>{
        return element.avance;
      })

    } catch (e){
      console.log(e);
    } 
    cat1_gen=Object.values(categ_gen.value);
    dat1_gen=Object.values(datos_gen.value);

    series_gen1=dat1_gen.slice(0,1)
    series_gen3=dat1_gen.slice(1,2)
    series_gen5=dat1_gen.slice(2,3)
    series_gen6=dat1_gen.slice(3,4)

    console.log('series gen1:',series_gen1);

}



//grafico ro
chartOptions_ro= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#206EF6"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: "#DDD",
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['Recursos Ordinarios'],
}


//grafico rdr
chartOptions_rdr= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#04BE75"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['RDR'],
}


//grafico dt
chartOptions_dt= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#B6A304"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['Donaciones y Transf.'],
}


//grafico rd
chartOptions_rd= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#C403B6"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['Recursos Determ.'],
}



//grafico gen1
chartOptions_gen1= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#206EF6"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: "#DDD",
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['1. Personal y Oblig. Soc.'],
}


//grafico gen3
chartOptions_gen3= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#04BE75"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['3 Bienes y Servicios'],
}


//grafico gen5
chartOptions_gen5= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#B6A304"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
      
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
    
  },
  labels: ['5 Otros Gastos'],
}


//grafico gen6
chartOptions_gen6= {
  chart: {
    height: 500,
    type: 'radialBar'
  },
  colors: ["#C403B6"],
  plotOptions: {
    radialBar: {
      track:{
        background:'#E6EEEE',
        dropShadow: {
          enabled: true,
          top: 2,
          left: 2,
          blur: 5,
          opacity: 0.3
        }
      },
      hollow: {
        margin:0,
        size: '50%',
      },
    },

    dataLabels: {
        name: {
          offsetY: -10,
          color: "#fff",
          fontSize: "25px"
        }
      },
    value: {
        color: '#DDD',
        fontSize: "20px",
        show: true,
        offsetY: -15,
    }
  },

  labels: ['6 Adquisición de Activos'],
}









onMounted(()=>{
  get_dat_gen();
  get_avance_fuente();
  get_avance_programa();
  get_avance_generica();
})

</script>

<template>
  <div class="container-fluid mt-2">
      <h1 class="titulo">Montos Totales</h1>
      <div class="row">
        <div class="col-md-3">
          <div class="card text-white bg-primary">
            <div class="card-header text-center"><h3>PIA</h3></div>
              <div class="card-body">
                <p class="card-title text-center">Presupuesto Institucional de Apertura</p>
                <p class="card-text"><h2 class="titulo2 text-center">S/. {{ pia }}</h2></p>
              </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <div class="card text-white bg-success">
            <div class="card-header text-center"><h3>PIM</h3></div>
              <div class="card-body">
                <p class="card-title text-center">Presupuesto Institucional Modificado</p>
                <p class="card-text text-center"><h2 class="titulo2">S/. {{ pim }}</h2></p>
              </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-white bg-secondary">
            <div class="card-header text-center"><h3>Devengado</h3></div>
              <div class="card-body">
                <p class="card-title text-center">Monto Devengado</p>
                <p class="card-text titulo2 text-center"><h2 class="titulo2">S/. {{ dev }}</h2></p>
              </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card text-white bg-danger">
            <div class="card-header text-center"><h3>% Avance</h3></div>
              <div class="card-body">
                <p class="card-title text-center">% de Ejecución Total</p>
                <p class="card-text text-center"><h2 class="titulo2">{{ avc }} %</h2></p>
              </div>
          </div>
        </div>
      </div>

      <div class="row">
        <h1 class="titulo">Ejecución por Fuentes de Financiamiento</h1>
        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_ro"
            :series="series_ro"
            />
          </div>
        </div>

        <div class="col-md-3">
            <div>
              <VueApexCharts width="100%" height=400px
              :options="chartOptions_rdr"
              :series="series_rdr"
              />
            </div>
        </div>

        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_dt"
            :series="series_dt"
            />
          </div>
        </div>

        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_rd"
            :series="series_rd"
            />
          </div>
        </div>
      </div>


      <div class="row">
        <div class="col-md-12">
          <div class="tab">
            <DataTable :data="avc_fte" :columns="columns" :options="opciones" class="table table-bordered table-striped table-hover table-compact">
              <thead>
                <tr>
                    <th style=" width: 30%;">Fuente</th>
                    <th style=" width: 15%;">PIA</th>
                    <th style=" width: 15%;">PIM</th>
                    <th style=" width: 15%;">Devengado</th>
                    <th style=" width: 15%;">Saldo</th>
                    <th style=" width: 10%; text-align: center;">% Ejecución</th>
                </tr>
            </thead>
            </DataTable>
          </div>
        </div>

      </div>


      <div class="row">
        <h1 class="titulo">Ejecución por Genérica de gasto</h1>
        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_gen1"
            :series="series_gen1"
            />
          </div>
        </div>

        <div class="col-md-3">
            <div>
              <VueApexCharts width="100%" height=400px
              :options="chartOptions_gen3"
              :series="series_gen3"
              />
            </div>
        </div>

        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_gen5"
            :series="series_gen5"
            />
          </div>
        </div>

        <div class="col-md-3">
          <div>
            <VueApexCharts width="100%" height=400px
            :options="chartOptions_gen6"
            :series="series_gen6"
            />
          </div>
        </div>
      </div>

      <div class="row">
        
        <div class="col-md-12">
          <div class="tab">
            <DataTable :data="avc_gen" :columns="columns_gen" :options="opciones" class="table table-bordered table-striped table-hover table-compact">
              <thead>
                <tr>
                    <th style=" width: 30%;">Generica</th>
                    <th style=" width: 15%;">PIA</th>
                    <th style=" width: 15%;">PIM</th>
                    <th style=" width: 15%;">Devengado</th>
                    <th style=" width: 15%;">Saldo</th>
                    <th style=" width: 10%; text-align: center;">% Ejecución</th>
                </tr>
            </thead>
            </DataTable>
          </div>
        </div>

      </div>


      <div class="row">
        <h1 class="titulo">Ejecución por Programas Presupuestales</h1>
        <div class="col-md-6">
          <div class="tab">
            <DataTable :data="avc_prog" :columns="columns_prog" :options="opciones" class="table table-bordered table-striped table-hover table-compact">
              <thead>
                <tr>
                    <th style=" width: 40%;">programa</th>
                    <th style=" width: 15%;">PIA</th>
                    <th style=" width: 15%;">PIM</th>
                    <th style=" width: 15%;">Devengado</th>
                    <th style=" width: 15%; text-align: center;">% Ejecución</th>
                </tr>
            </thead>
            </DataTable>
          </div>
        </div>

        <div class="col-md-6">
          <div class="tab">
            <VueApexCharts width="100%" height=700px%
            type="bar"
            :options="chartOptions"
            :series="series"
            />
          </div>
        </div>

      </div>
    
    </div>

    
</template>

<style>
.tab{
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 1px 2px 8px 3px #756F6E;
  background-color: rgb(241, 244, 247);
  color: rgb(3, 15, 24);
  overflow:visible ;
}


.derecha{
  text-align: right;
}
.centro{
  text-align: center;
}




</style>