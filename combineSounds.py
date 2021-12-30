import os
import glob

source_path = 'source/res/sound'
output_path = 'source/res/audio'
audiosprite_bin = 'audiosprite'
build = '-s 0.25 -g 0.25 -e "ogg,m4a,mp3,ac3" -o ' + \
    output_path+'/soundSprite -u "res/audio"'
executable = audiosprite_bin + ' ' + build

for filename in glob.iglob(source_path + '/**/*.mp3'):
    executable += ' ' + filename

for filename in glob.iglob(source_path + '/**/*.wav'):
    executable += ' ' + filename

for filename in glob.glob(output_path+'/*'):
    os.system('attrib -r '+filename)

print(executable)
os.system(executable)

# print 'compile soy object'

print('done')
