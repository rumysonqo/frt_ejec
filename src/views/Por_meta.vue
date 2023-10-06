<script setup>
import axios from 'axios'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import VueApexCharts from "vue3-apexcharts";
import {ref, onMounted} from "vue"

DataTable.use(DataTablesCore);
//direccion de la api
const url='http://api_ejec.redcusconorte.gob.pe/api/';

//datos generales
let dat_gen=ref([])
let pia=ref(0);
let pim=ref(0);
let dev=ref(0);
let mta=ref(0);
let avc=ref(0);
let pavc=ref(0);
let sal=ref(0);
let eje=ref(0);

//programas
let prog=ref([])
let cod_prg=''
async function get_programas(){
  try {
      const response = await axios.get(url+'programas')
      prog.value = response.data
    } catch (e) {
      error.value = e
    }
}
let meta=ref([])
let cod_met=''
//metas
async function get_metas(){
  try {
      const response = await axios.get(url+'metas/'+cod_prg)
      meta.value = response.data
    } catch (e) {
      error.value = e
    }
}

//fuentes por meta
let fuente=ref([])
let cod_fte=''
async function get_fuente_meta(){
  try {
      const response = await axios.get(url+'fuente_meta/'+cod_met)
      fuente.value = response.data
    } catch (e) {
      error.value = e
    }
}

//generica por meta y fuente
let generica=ref([])
let cod_gen=''
async function get_generica_meta_fuente(){
  try {
      const response = await axios.get(url+'generica_meta_fuente/'+cod_met+"/"+cod_fte)
      generica.value = response.data
    } catch (e) {
      error.value = e
    }
}


//datos generales por meta
async function get_dat_gen_meta(){
  try {
      const response = await axios.get(url+'datos_generales_meta/'+cod_met)
      dat_gen.value = response.data
      console.log('dat_gen:',dat_gen)
      pia.value=dat_gen.value[0].pia;
      pim.value=dat_gen.value[0].pim;
      dev.value=dat_gen.value[0].devengado;
      mta.value=dat_gen.value[0].meta_fisica;
      avc.value=dat_gen.value[0].avance_fisico;
      pavc.value=dat_gen.value[0].porcentaje_avance;
      sal.value=dat_gen.value[0].saldo;
      eje.value=dat_gen.value[0].avance;
    } catch (e) {
      error.value = e
    }
}

//especificas por meta, fuente y generica
let especifica=ref([])
let categ_espe=ref([])
let datos_espe=ref([])
let cat1_espe=([])
let dat1_espe=([])
let chartOptions=ref([])
let series=([])

async function get_especifica_meta_fuente_generica(){
  try {
      const response = await axios.get(url+'especifica_meta_fuente_generica/'+cod_met+"/"+cod_fte+"/"+cod_gen)
      especifica.value = response.data
      categ_espe.value=especifica.value.map((element)=>{
        return element.especifica;
      })

      datos_espe.value=especifica.value.map((element)=>{
        return element.avance;
      })
    } catch (e) {
      error.value = e
    }

    cat1_espe=Object.values(categ_espe.value);
    dat1_espe=Object.values(datos_espe.value);

    chartOptions.categories=cat1_espe;
    series.data=dat1_espe;
    chartOptions= {
        xaxis: {
          categories: cat1_espe,
        },
      }
    series= [
        {
          data: dat1_espe,
        },
      ]

}

//tabla por especificas
const columns_espe=[{data:'especifica'},{data:'pia',className:'derecha'},{data:'pim',className:'derecha'},{data:'devengado',className:'derecha'},{data:'saldo',className:'derecha'},{data:'avance',className:'derecha'}]
const opciones={responsive:true, autowidth:false, language:{search:'Buscar', decimal:'.',thousands:',', lengthMenu:'Mostrando _MENU_ registros por pagina', zeroRecords:'No hay registros que mostrar', info:'Mostrando _START_ a _END_ de _TOTAL_ registros', infoEmpty:'Mostrando registros del 0 al 0 de un total de 0 registros',
infoFiltered:'(filtrado de un total de _MAX_ registros)',paginate:{firts:'Primero', previous:'Anterior', next:'Siguiente', last:'Ultimo'}} }

//grafico de barras por especifica
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


onMounted(()=>{
    get_programas();
})
</script>
<template>
    <div class="container-fluid">
        <div class="row shadow-sm p-1 mb-1 bg-body rounded">
          <!--select de programa meta-->
            <div class="form-group row p-3">
                <div class="col-md-6">
                    <label for="programa" class="col-form-label"><h4>Programa</h4></label>
                    <select @change="get_metas()" v-model="cod_prg" id="programa" class="form-select form-select-md mb-3">
                        <option value="" disabled selected>Seleccione un programa</option>
                        <option v-for="prg in prog" :value="prg.cod_programa">
                        {{ prg.programa }}
                        </option>
                    </select>
                    <label for="meta" class="col-form-label"><h4>Meta</h4></label>
                    <select @change="get_dat_gen_meta(), get_fuente_meta(), get_generica_meta_fuente(), get_especifica_meta_fuente_generica()" v-model="cod_met" id="meta" class="form-select form-select-md mb-3">
                        <option value="" disabled selected>Seleccione una meta</option>
                        <option v-for="met in meta" :value="met.cod_meta">
                        {{ met.meta }}
                        </option>
                    </select>
                </div>

                <div class="col-md-3">
                    <div class="card border-success mb-1 pa-0" style="max-height: 15rem;">
                        <div class="card-header text-center text-success"><h2 class="titulo">% Ejecución</h2></div>
                            <div class="card-body text-success">
                            <span class="badge rounded-pill text-bg-danger ms-1 pb-0 pt-1"><h6>Ejecución (Devengado / PIM) {{eje}}%</h6></span>
                            <div class="progress mt-2" style="height: 50px;border-radius:25px;">
                                <div class="progress-bar bg-success " role="progressbar" v-bind:style="`width:${eje}%;`" aria-valuenow={{eje}} aria-valuemin="0" aria-valuemax="100"><h3 class="titulo2">{{eje}}%</h3></div>
                            </div>
                            </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card border-success mb-1 pa-0" style="max-height: 15rem;">
                        <div class="card-header text-center text-success"><h2 class="titulo">% Avance</h2></div>
                            <div class="card-body text-success">
                              <span class="badge rounded-pill text-bg-primary pb-0 pt-1"><h6>Meta : {{mta}}</h6></span>
                              <span class="badge rounded-pill text-bg-warning ms-1 pb-0 pt-1"><h6>Avance : {{avc}}</h6></span>
                              <span class="badge rounded-pill text-bg-danger ms-1 pb-0 pt-1"><h6>{{pavc}}%</h6></span>
                            <div class="progress mt-2" style="height: 50px; border-radius:25px;">
                                <div class="progress-bar bg-success" role="progressbar" v-bind:style="`width:${pavc}%;`" aria-valuenow={{pavc}} aria-valuemin="0" aria-valuemax="100"><h3 class="titulo2">{{pavc}}%</h3></div>
                            </div>
                            </div>
                    </div>
                </div>


                
            </div>
        </div>
    </div>

    <!--datos generales por meta-->
      <div class="row p-2 shadow-sm">
        <h1 class="titulo">Montos Totales</h1>
        <div class="col-md-3">
          <div class="card border-primary mb-1" style="max-width: 28rem;">
            <div class="card-header text-center text-primary"><h2 class="titulo">PIA</h2></div>
              <div class="card-body text-primary">
                <p class="card-text text-center">Presupuesto Institucional de Apertura</p>
                <p class="card-text bg-transparent border-primary titulo3 derecha"><h2 class="titulo2 text-center">S/. {{ pia }}</h2></p>
              </div>
          </div>
        </div>
        
        <div class="col-md-3">
            <div class="card border-primary mb-1" style="max-width: 28rem;">
                <div class="card-header text-center text-primary"><h2 class="titulo">PIM</h2></div>
                  <div class="card-body text-primary">
                    <p class="card-text text-center">Presupuesto Institucional Modificado</p>
                    <p class="card-text bg-transparent border-primary titulo3 derecha"><h2 class="titulo2 text-center">S/. {{ pim }}</h2></p>
                  </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card border-primary mb-1" style="max-width: 28rem;">
                <div class="card-header text-center text-primary"><h2 class="titulo">Devengado</h2></div>
                  <div class="card-body text-primary">
                    <p class="card-text text-center">Monto Devengado u Obligación de pago</p>
                    <p class="card-text bg-transparent border-primary titulo3 derecha"><h2 class="titulo2 text-center">S/. {{ dev }}</h2></p>
                  </div>
            </div>
        </div>

        <div class="col-md-3">
            <div class="card border-primary mb-1" style="max-width: 28rem;">
                <div class="card-header text-center text-primary"><h2 class="titulo">Saldo</h2></div>
                  <div class="card-body text-primary">
                    <p class="card-text text-center">Monto del Saldo (PIM - Devengado)</p>
                    <p class="card-text bg-transparent border-primary titulo3 derecha"><h2 class="titulo2 text-center">S/. {{ sal }}</h2></p>
                  </div>
            </div>
        </div>
        
        
      </div>

<!--select fuente-->
      <div class="row p-2 shadow-sm">
        <h1 class="titulo">Por Fuente, Generica y Clasificador</h1>
        <div class="col-md-6">
          <label for="fuente" class="col-form-label"><h4>Fuente</h4></label>
          <select @change="get_generica_meta_fuente()" v-model="cod_fte" id="fuente" class="form-select form-select-md mb-3">
            <option value="" disabled selected>Seleccione una fuente</option>
            <option v-for="fte in fuente" :value="fte.cod_fuente">
            {{ fte.fuente }}
            </option>
          </select> 
        </div>
          
        <div class="col-md-6">
          <label for="generica" class="col-form-label"><h4>Generica</h4></label>
            <select @change="get_especifica_meta_fuente_generica()" v-model="cod_gen" id="generica" class="form-select form-select-md mb-3">
                <option value="" disabled selected>Seleccione una generica</option>
                <option v-for="gen in generica" :value="gen.cod_generica">
                {{ gen.generica }}
                </option>
            </select>
        </div>
        

        
      </div>


      <div class="row shadow-sm p-1 mb-1 bg-body rounded">
        <!--select de programa meta-->
          <div class="form-group row p-3">
              <div class="col-md-12">
                <DataTable :data="especifica" :columns="columns_espe" :options="opciones" class="table table-bordered table-striped table-hover table-compact">
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

        


</template>

<style>

</style>

