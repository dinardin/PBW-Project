import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jyaejgafjmnxbmhghqyu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5YWVqZ2Fmam1ueGJtaGdocXl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NTU4NDQsImV4cCI6MjA2NjIzMTg0NH0.lT9co3qAWlgJz13wT3490NI_2L9uHczy_8xwXj-1heE"

export const supabase = createClient(supabaseUrl, supabaseKey)
