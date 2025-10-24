"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

interface ReportUploadModalProps {
  onClose: () => void
  onUpload: (reports: any[]) => void
}

export default function ReportUploadModal({ onClose, onUpload }: ReportUploadModalProps) {
  const [file, setFile] = useState<File | null>(null)
  const [reportType, setReportType] = useState("Lab Report")
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()
      formData.append("file", file)
      formData.append("reportType", reportType)

      const response = await fetch("/api/patient/reports", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload report")
      }

      const data = await response.json()
      onUpload([data.report])
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upload Medical Report</CardTitle>
            <CardDescription>Add a new health document to your records</CardDescription>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground"
            >
              <option>Lab Report</option>
              <option>Imaging (X-Ray, CT, MRI)</option>
              <option>Prescription</option>
              <option>Medical Certificate</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Select File</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input" className="cursor-pointer">
                <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                <p className="text-sm font-medium">{file ? file.name : "Click to upload or drag and drop"}</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 10MB)</p>
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary-dark"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
