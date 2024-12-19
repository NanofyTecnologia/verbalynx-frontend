'use client'

import {
  Font,
  Page,
  View,
  Text,
  Document,
  PDFViewer,
  StyleSheet,
  PDFDownloadLink,
} from '@react-pdf/renderer'

import { Button } from '@/components/ui/button'
import { type GetFeedbackByIdResponse } from '@/services/feedback/types'

type PDFProps = {
  feedback: GetFeedbackByIdResponse | undefined
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 15,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#555',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  },
  feedbackContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  feedbackHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 12,
    marginBottom: 5,
  },
})

// Fonte personalizada (opcional)
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxP.ttf' }, // Regular
    {
      src: 'https://fonts.gstatic.com/s/roboto/v20/KFOkCnqEu92Fr1Me5WZLCzYlKw.ttf',
      fontWeight: 'bold',
    }, // Bold
  ],
})

function FeedbackPDF({ feedback }: PDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cabeçalho */}
        <Text style={styles.header}>Relatório de Feedback</Text>

        {/* Informações Gerais */}
        <View style={styles.section}>
          <Text style={styles.subheader}>Informações do Aluno</Text>
          <Text style={styles.text}>Nome: {feedback?.student.name}</Text>
          <Text style={styles.text}>Turma: {feedback?.class.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Atividade</Text>
          <Text style={styles.text}>Nome: {feedback?.task.name}</Text>
          <Text style={styles.text}>
            Critérios: {feedback?.task.rubric.criterion.length}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheader}>Comentários do Feedback</Text>

          {feedback?.feedbackCriterion.map((criterion, index) => (
            <View key={criterion.id} style={styles.feedbackContainer}>
              <Text style={styles.feedbackHeader}>
                Critério {index + 1}: Nível {criterion.level} | Nota:{' '}
                {criterion.score}
              </Text>
              <Text style={styles.feedbackText}>
                Comentário: {criterion.comment}
              </Text>
              {/* <Text style={styles.feedbackText}>Dicas:</Text>
              <View>
                {criterion.tips.map((tip, tipIndex) => (
                  <Text key={tipIndex} style={styles.feedbackText}>
                    - {tip}
                  </Text>
                ))}
              </View> */}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}

export default function SavePDF(props: PDFProps) {
  const { feedback } = props

  return (
    <>
      <Button asChild onClick={() => console.log('Exportar PDF')} size="sm">
        <PDFDownloadLink
          className="text-center"
          document={<FeedbackPDF feedback={feedback} />}
          fileName={`${feedback?.student.name.replaceAll(' ', '_')}_${feedback?.task.name.replaceAll(' ', '_')}.pdf`}
        >
          Exportar .PDF
        </PDFDownloadLink>
      </Button>
    </>
  )
}
