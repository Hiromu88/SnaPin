# Generated by Django 3.1.7 on 2021-04-14 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0006_auto_20210414_2357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images'),
        ),
    ]