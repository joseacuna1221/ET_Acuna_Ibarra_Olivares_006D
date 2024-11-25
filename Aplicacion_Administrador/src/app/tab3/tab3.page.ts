import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { ApicrudeventosService } from '../services/apicrudeventos.service';
import { IEventos } from 'src/interfaces/IEventos';
import { Router, ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { IQREvento } from 'src/interfaces/IQR';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  eventos: IEventos[] = [];
  evento: any;
  // un boolean para activar el modo camara
  isScanning: boolean = false;

  constructor(
    private menucontroller: MenuController,
    private apicrud: ApicrudeventosService,
    private router: Router,
    private activated: ActivatedRoute,
    private alert: AlertController
  ) {
    this.activated.queryParams.subscribe((param) => {
      if (param['evento']) {
        try {
          this.evento = JSON.parse(param['evento']);
        } catch (e) {
          console.error('Error al parsear JSON: ', e);
        }
      }
    });
  }

  ngOnInit() {
    this.apicrud.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  editarEvento(Observable: any) {
    this.router.navigate(['/editevent'], {
      queryParams: { evento: JSON.stringify(Observable) },
    });
  }

  listaAsistentes(Observable: any) {
    this.router.navigate(['/asistentes'], {
      queryParams: { evento: JSON.stringify(Observable) },
    });
  }

  comentarios(Observable: any) {
    this.router.navigate(['/comentarios'], {
      queryParams: { evento: JSON.stringify(Observable) },
    });
  }

  async scanearQR() {
    try {
      // Checamos permisos de la cámara
      await this.checkPermissions();
  
      // Ocultamos el fondo para una mejor experiencia de escaneo
      BarcodeScanner.hideBackground();
  
      // Activamos el modo de escaneo
      this.isScanning = true;
  
      // Iniciamos el escaneo
      const resultado = await BarcodeScanner.startScan();
      this.isScanning = false;
  
      if (resultado.hasContent) {
        // Parseamos el contenido del QR
        const qrData: IQREvento = JSON.parse(resultado.content);
  
        // Extraemos los datos
        const nombreEvento = qrData.evento.nombre;
        const nombreEstudiante = qrData.evento.usuario.nombre;
        const rutEstudiante = qrData.evento.usuario.rut;
  
        // Mostramos un cuadro de diálogo con opciones
        const alert = await this.alert.create({
          header: 'Código Escaneado',
          message:
          'Nombre del evento: ' + nombreEvento + '\n' +
          'Nombre del estudiante: ' + nombreEstudiante + '\n' +
          'RUT del estudiante: ' + rutEstudiante,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
                console.log('Cancelado');
              }
            },
            {
              text: 'Registrar',
              handler: () => {
                // Llamar al servicio para guardar los datos del QR en la ruta /QR
                this.apicrud.putQR(qrData).subscribe(
                  (response) => {
                    console.log('QR registrado con éxito:', response);
                    this.showAlert('Éxito', 'El QR fue registrado correctamente.');
                  },
                  (error) => {
                    console.error('Error al registrar el QR:', error);
                    this.showAlert('Error', 'Ocurrió un problema al registrar el QR.');
                  }
                );
              },
            }
          ]
        });
  
        await alert.present();
      } else {
        await this.showAlert('Error', 'No se encontró ningún contenido.');
      }
    } catch (error) {
      console.error('Error durante el escaneo:', error);
      this.isScanning = false;
      await this.showAlert('Error', 'Ocurrió un problema al escanear el código QR.');
    } finally {
      BarcodeScanner.showBackground();
    }
  }

  async checkPermissions() {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (!status.granted) {
      throw new Error('Permiso de cámara no otorgado');
    }
  }

  async stopScanner() {
    this.isScanning = false;
    await BarcodeScanner.stopScan();
    BarcodeScanner.showBackground();
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
