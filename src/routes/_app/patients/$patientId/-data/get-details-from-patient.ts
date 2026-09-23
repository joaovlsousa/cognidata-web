import { format } from 'date-fns'
import type { GetPatientResponse } from '@/http/patient/get-patient'
import { maskPhone } from '@/lib/utils'

const kinshipMapper = {
  'father/mother': 'Pai/Mãe',
  'grandfather/grandmother': 'Avô/Avó',
  'uncle/aunt': 'Tio/Tia',
}

const schoolScheduleMapper = {
  morning: 'Manhã',
  afternoon: 'Tarde',
  fullTime: 'Integral',
}

export function getDetailsFromPatient(patient: GetPatientResponse['patient']) {
  const patientDetails = [
    {
      title: 'Nome',
      description: patient.name,
    },
    {
      title: 'Data de Nascimento',
      description: format(
        new Date(`${patient.dateOfBirth}T00:00`),
        'dd/MM/yyy'
      ),
    },
    {
      title: 'CPF',
      description: patient.cpf,
    },
    {
      title: 'Gênero',
      description: patient.gender === 'female' ? 'Feminino' : 'Masculino',
    },
  ]

  const responsibleDetails = [
    {
      title: 'Nome',
      description: patient.patientResponsibleName,
    },
    {
      title: 'Parentesco',
      description: kinshipMapper[patient.patientResponsibleKinship],
    },
    {
      title: 'Telefone',
      description: maskPhone(patient.patientResponsiblePhone),
    },
    {
      title: 'E-mail',
      description: patient.patientResponsibleEmail,
    },
  ]

  const schoolDetails = [
    {
      title: 'Escola',
      description: patient.schoolName,
    },
    {
      title: 'Ano escolar',
      description: `${patient.schoolYear}° ano`,
    },
    {
      title: 'Turno',
      description: schoolScheduleMapper[patient.schoolSchedule],
    },
  ]

  const clinicalDetails = [
    {
      title: 'Queixa principal',
      description: patient.medicalChiefComplaint,
    },
    {
      title: 'Observações',
      description: patient.medicalObservations ?? '',
    },
  ]

  return {
    patientDetails,
    responsibleDetails,
    schoolDetails,
    clinicalDetails,
  }
}
