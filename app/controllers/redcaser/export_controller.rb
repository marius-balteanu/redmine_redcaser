class Redcaser::ExportController < RedcaserBaseController
  def index
    project_name = @project.name.gsub(' ', '_');
    current_time = Time.now.strftime('%d%m%Y-%I%M%S')
    filename = "TCReport-#{project_name}-#{current_time}"
    case params[:export_to]
      when 'excel'
        doc = export_to_excel
      when 'rtf'
        doc = export_to_rtf
    end
    send_data(
      doc[:document], {
        filename: "#{filename}.#{doc[:extension]}"
      }
    )
  end

  private

  def export_to_excel
    excelDoc = ExcelExporter.exportTestResults(
      @project.id,
      params[:suite_id],
      params[:version_id],
      params[:environment_id]
    )
    {
      document: excelDoc,
      extension: 'csv'
    }
  end

  def export_to_rtf
    rtfDoc = RTFExporter.exportTestSuiteSpec(
      params[:suite_id].to_i,
      @project
    )
    {
      document: rtfDoc,
      extension: 'rtf'
    }
  end
end
